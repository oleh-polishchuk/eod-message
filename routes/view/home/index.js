const express = require('express');
const router = express.Router();
const path = require('path');
const api = require("../../../src/api");

router.get('/', (req, res) => {
    api.getEODMessage(req.query.from).then(message => {
        res.render(path.resolve(__dirname, "../../../views/index.ejs"), {
            message: message,
        });
    }).catch(reason => {
        res.send(reason.message)
    });
});

module.exports = router;
