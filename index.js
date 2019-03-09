const config = require('dotenv').config();
const harvest = require('./harvest');
const asana = require('./asana');
const EODMessage = require('./EODMessage');

async function init() {
    const timeEntries = await harvest.getTimeEntries({ from: "2019-03-08T00:00:00Z" });

    const harvestTasks = timeEntries
        .map(timeEntry => ({
            notes: timeEntry.notes,
            id: timeEntry.external_reference.id,
            permalink: timeEntry.external_reference.permalink,
        }));

    const asanaTasksPromises = harvestTasks.map(({ id }) => (asana.getTaskById({ id })));
    const asanaTasks = await Promise.all(asanaTasksPromises);
    const tasks = asanaTasks
        .map(asanaTask => {
            const harvestTask = harvestTasks
                .find(harvestTask => harvestTask.id.toString() === asanaTask.id.toString());
            return {
                ...harvestTask,
                name: asanaTask.name,
                status: asanaTask.memberships[ 0 ].section.name,
            }
        });

    const eodMessage = new EODMessage();
    tasks.map(task => eodMessage.addTask(task));
    const slackMessage = eodMessage.build();

    console.log(slackMessage);
}

init().catch(error => console.log(error));
