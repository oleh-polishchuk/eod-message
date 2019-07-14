const axios = require('axios');
const moment = require('moment');

module.exports.getTimeEntries = async function getTimeEntries(from) {
    const res = await axios
        .get(`https://api.harvestapp.com/v2/time_entries`, {
            params: {
                from: from,
                to: from,
                user_id: process.env.HARVEST_USER_ID,
            },
            headers: {
                'Authorization': `Bearer ${process.env.HARVEST_BEARER_TOCKEN}`,
                'Harvest-Account-Id': `${process.env.HARVEST_ACCOUNT_ID}`,
                'User-Agent': 'MyApp (yourname@example.com)',
            },
        });

    if (!res || res.status !== 200) {
        throw new Error(`Can not fetch time entries from api.harvestapp.com!`);
    }

    const timeEntries = res.data.time_entries
        .map(timeEntry => {
            const externalReference = timeEntry.external_reference;

            return {
                notes: timeEntry.notes,
                id: externalReference && externalReference.id,
                permalink: externalReference && externalReference.permalink,
                hours: timeEntry.hours,
                spentDate: timeEntry.spent_date,
            }
        })
        .filter(timeEntry => timeEntry.notes && timeEntry.id && timeEntry.permalink);

    const uniqueTimeEntries = Object.values(timeEntries.reduce((joinedTimeEntries, timeEntry) => {
        if (joinedTimeEntries[timeEntry.name]) {
            joinedTimeEntries[timeEntry.name].hours = moment
                .duration(joinedTimeEntries[timeEntry.name].hours, 'hours')
                .add(timeEntry.hours, 'hours')
                .asHours();
        } else {
            joinedTimeEntries[timeEntry.name] = timeEntry;
        }
        return joinedTimeEntries;
    }, {}));

    if (!uniqueTimeEntries || (Array.isArray(uniqueTimeEntries) && !uniqueTimeEntries.length)) {
        throw new Error(`There are no time entries from ${from}`);
    }

    return uniqueTimeEntries;
};
