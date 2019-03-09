const axios = require('axios');

module.exports.getTimeEntries = async function getTimeEntries({ from }) {
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

    return res.data.time_entries;
};
