const { WebClient } = require('@slack/client');

module.exports.sendMessage = async (message) => {
    const web = new WebClient(process.env.SLACK_TOKEN);
    const res = await web.chat.postMessage({
        channel: message.channel,
        text: message.text,
        as_user: true,
    });

    if (!res || !res.ok) {
        throw new Error(`==> Can not send message to slack channel!`);
    }

    return res;
};
