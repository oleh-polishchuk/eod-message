const axios = require('axios');

const getTaskById = async ({ id }) => {
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

const createPermalink = (projectId, taskId) => `https://app.asana.com/0/${projectId}/${taskId}`;

module.exports.getTasks = async (timeEntries) => {
    const ids = timeEntries.map(_ => (_.id));
    if (!ids || !Array.isArray(ids) || !ids.length) {
        throw new Error(`==> Can not get tasks without list of ids!`);
    }

    const $promises = ids.map(id => getTaskById({ id }));
    const asanaTasks = await Promise.all($promises);
    return asanaTasks.map(asanaTask => {
        const membership = asanaTask.memberships[ 0 ];
        const project = membership.project;
        const section = membership.section;
        return {
            name: asanaTask.name,
            permalink: createPermalink(project.id, section.id),
            status: section.name,
        }
    });
};
