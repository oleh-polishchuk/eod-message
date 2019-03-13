const Message = require('./Message');

module.exports.createEODMessage = (tasks) => {
    return new Message(tasks).build();
};
