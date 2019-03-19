const config = require('dotenv').config();
const app = require('express')();
const api = require("./src/api");

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/eod-message', (req, res) => {
    api.getEODMessage(req.query.from).then(message => {
        res.send(`<pre>${message.text}</pre>`)
    }).catch(reason => {
        res.send(reason)
    })
});

app.get('/eod-message/send', (req, res) => {
    api.sendEODMessage(req.query.from).then(value => {
        res.send(`<pre>${JSON.stringify(value, null, 2)}</pre>`)
    }).catch(reason => {
        res.send(reason)
    })
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
