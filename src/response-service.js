const logger = require('./logger');

module.exports.json = (res, data) => {
    res.json(data);
    logger.log('Respond with data: ', data);
};

module.exports.error = (res, message) => {
    res.status(500).send(message);
    logger.error(`Respond with error: ${message}`);
};
