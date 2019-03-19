const createMessage = (task) => `1. I did ${task.name} - ${task.permalink} - *${task.status}* \n`;

class Message {

    constructor(tasks) {
        this.tasks = tasks;
    }

    addTask(name, permalink, status) {
        this.tasks.push({ name, permalink, status });
        return this;
    }

    build() {
        if (!this.tasks.length) return "No tasks found today.";

        let channel = process.env.SLACK_BUNDLE_CONVERSATION_ID;
        const endTask = this.tasks.find(t => t.status.includes('Doing'));

        let text = `<@${process.env.SLACK_USER_ID}> *EOD* \n`;
        const tasks = this.tasks
            .sort((a, b) => b.name.localeCompare(a.name))
            .reduce((msg, task) => msg += createMessage(task), '');
        text += tasks.toString();
        text += `\n`;
        if (endTask && endTask.name) {
            text += `*Tomorrow* \n`;
            text += `I will continue with ${endTask.name}`;

            if (endTask.name.includes('[WV]')) {
                channel = process.env.SLACK_WOVENLY_CONVERSATION_ID;
            } else if (endTask.name.includes('[BUN]')) {
                channel = process.env.SLACK_BUNDLE_CONVERSATION_ID;
            } else if (endTask.name.includes('[AW]')) {
                channel = process.env.SLACK_AWARA_CONVERSATION_ID;
            }
        }

        return { text, channel };
    }

}

module.exports = Message;
