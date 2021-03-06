const express = require('express');
const router = express.Router();
const api = require("../../../src/api");

router.get('/', (req, res) => {
    api.getEODMessage(req.query.from).then(message => {
        res.send(message && message.text)
    }).catch(reason => {
        res.send(reason && reason.message)
    })
});

router.get('/send', (req, res) => {
    api.sendEODMessage(req.query.from).then(value => {
        res.send(`<pre>${ JSON.stringify(value, null, 2) }</pre>`)
    }).catch(reason => {
        res.send(reason)
    })
});

module.exports = router;
