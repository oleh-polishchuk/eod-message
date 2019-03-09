const config = require('dotenv').config();
const moment = require('moment');
const harvest = require('./harvest');
const asana = require('./asana');
const EODMessage = require('./EODMessage');
const { WebClient } = require('@slack/client');

(async () => {
    const from = moment()
        .set({ hour: 0, minute: 0, second: 0 })
        .format("YYYY-MM-DDTHH:mm:ss");

    const timeEntries = await harvest.getTimeEntries({ from });
    if (!timeEntries || (Array.isArray(timeEntries) && !timeEntries.length)) {
        console.log(`==> There are no time entries from ${from}`)
    }

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

    const web = new WebClient(process.env.SLACK_TOKEN);
    const res = await web.chat.postMessage({
        channel: `${process.env.SLACK_CONVERSATION_ID}`,
        text: slackMessage
    });

    console.log(res);
})();
