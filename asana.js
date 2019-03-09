const axios = require('axios');

module.exports.getTaskById = async function getTaskById({ id }) {
    const res = await axios
        .get(`https://app.asana.com/api/1.0/tasks/${id}`, {
            params: {
                assignee: 'me',
                workspace: `${process.env.ASANA_WORKSPACE}`,
            },
            headers: {
                Authorization: `Bearer ${process.env.ASANA_BEARER_TOCKEN}`,
            },
        });

    return res.data.data;
};
