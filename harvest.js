const axios = require('axios');

module.exports.getTimeEntries = async function getTimeEntries(from) {
    const res = await axios
        .get(`https://api.harvestapp.com/v2/time_entries`, {
            params: {
                from: from,
            },
            headers: {
                'Authorization': `Bearer ${process.env.HARVEST_BEARER_TOCKEN}`,
                'Harvest-Account-Id': `${process.env.HARVEST_ACCOUNT_ID}`,
                'User-Agent': 'MyApp (yourname@example.com)',
            },
        });

    if (!res || res.status !== 200) {
        throw new Error(`==> Can not fetch time entries from api.harvestapp.com!`);
    }

    const timeEntries = res.data.time_entries
        .map(timeEntry => ({
            notes: timeEntry.notes,
            id: timeEntry.external_reference.id,
            permalink: timeEntry.external_reference.permalink,
        }));

    if (!timeEntries || (Array.isArray(timeEntries) && !timeEntries.length)) {
        throw new Error(`==> There are no time entries from ${from}`);
    }

    return timeEntries;
};
