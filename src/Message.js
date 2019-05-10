const createMessage = (task, i) => `${i + 1}. I did ${task.name} - ${task.permalink} - *${task.status}* \n`;

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

        let channel = process.env.SLACK_EOD_CONVERSATION_ID;
        const endTask = this.tasks.find(t => t.status.includes('Doing'));

        let text = `#*EOD*: \n`;
        text += `_Today_:\n`;
        const tasks = this.tasks
            .sort((a, b) => b.name.localeCompare(a.name))
            .reduce((msg, task, i) => msg += createMessage(task, i), '');
        text += tasks.toString();
        text += `\n`;
        if (endTask && endTask.name) {
            text += `*Tomorrow* \n`;
            text += `I will continue with ${endTask.name}`;
        }

        return { text, channel };
    }

}

module.exports = Message;
