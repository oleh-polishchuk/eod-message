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

        const endTask = this.tasks.find(t => t.status.includes('Doing'));

        let message = `<@${process.env.SLACK_USER_ID}> *EOD* \n`;
        const tasks = this.tasks
            .sort((a, b) => b.name.localeCompare(a.name))
            .reduce((msg, task) => msg += createMessage(task), '');
        message += tasks.toString();
        message += `\n`;
        if (endTask && endTask.name) {
            message += `*Tomorrow* \n`;
            message += `I will continue with ${endTask.name}`;
        }

        return message;
    }

}

module.exports = Message;
