class EODMessage {

    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
        return this;
    }

    build() {
        if (!this.tasks.length) return "";

        const endTask = this.tasks[this.tasks.length - 1];

        let message = `<@${process.env.SLACK_USER_ID}> *EOD*`;
        this.tasks.forEach(task => {
            message += `1. I did ${task.name} - ${task.permalink} - *${task.status}* \n`;
        });
        message += `\n`;
        message += `*Tomorrow* \n`;
        message += `I will continue with ${endTask.name}`;

        return message;
    }

}

module.exports = EODMessage;
