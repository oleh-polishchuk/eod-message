module.exports.log = (messages, data) => console.log('==>', messages, data && JSON.stringify(data));

module.exports.error = message => console.error('==>', message);
