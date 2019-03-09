const EODMessage = require('./EODMessage');

module.exports.createEODMessage = (tasks) => {
    const eodMessage = new EODMessage();
    tasks.map(task => eodMessage.addTask(task));
    return eodMessage.build();
};
