const utils = require("./utils");
const harvest = require("./harvest");
const asana = require("./asana");
const messenger = require("./messenger");
const slack = require("./slack");

module.exports.getEODMessage = async (from) => {
    if (!from) {
        from = utils.getCurrentDate();
    }

    const timeEntries = await harvest.getTimeEntries(from);
    const asanaTasks = await asana.getTasks(timeEntries);
    return messenger.createEODMessage(asanaTasks);
};

module.exports.sendEODMessage = async (from) => {
    if (!from) {
        from = utils.getCurrentDate();
    }

    const timeEntries = await harvest.getTimeEntries(from);
    const asanaTasks = await asana.getTasks(timeEntries);
    const message = messenger.createEODMessage(asanaTasks);
    return await slack.sendMessage(message);
};
