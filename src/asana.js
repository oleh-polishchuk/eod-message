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
    const asanaTasks = [];
    const allTasks = await Promise.all($promises);
    allTasks.map(task => {
        const asanaTask = asanaTasks.find(at => at && (at.id === task.id));
        if (!asanaTask) {
            asanaTasks.push(task)
        }
    });
    const $asanaTaskPromises = asanaTasks.map(async asanaTask => {
        let membership = asanaTask.memberships[ 0 ];
        if (!membership) {
            const parentId = asanaTask.parent.id;
            const parentAsanaTask = await getTaskById({ id: parentId });
            membership = parentAsanaTask.memberships[ 0 ];
        }

        const project = membership.project;
        const section = membership.section;

        const harvestTimeEntry = timeEntries.find(timeEntry => timeEntry.id === asanaTask.gid);
        return {
            name: asanaTask.name,
            permalink: createPermalink(project.id, section.id),
            status: section.name,
            hours: harvestTimeEntry.hours,
            spentDate: harvestTimeEntry.spentDate,
        }
    });

    return await Promise.all($asanaTaskPromises);
};
