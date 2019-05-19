const express = require('express');
const router = express.Router();
const api = require("../../../src/api");
const responseService = require('../../../src/response-service');

router.get('/', (req, res) => res.send('Hello World!'));

router.get('/send', (req, res) => {
    api.sendReports(req.query.from)
        .then(value => {
            responseService.json(res, value);
        })
        .catch(reason => {
            responseService.error(res, reason.message);
        });
});

module.exports = router;
