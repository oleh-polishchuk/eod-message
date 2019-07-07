const express = require('express');
const router = express.Router();
const path = require('path');
// const api = require("../../../src/api");

const sendIndexHtml = (req, res) => res.sendFile(path.resolve(__dirname, "../../views/index.html"));

router.get('/', sendIndexHtml);
router.get('/reports', sendIndexHtml);
router.get('/eod-message', sendIndexHtml);

// api.getEODMessage(req.query.from).then(message => {
//     res.render(path.resolve(__dirname, "../../../views/index.ejs"), {
//         message: message,
//     });
// }).catch(reason => {
//     res.send(reason.message)
// });

module.exports = router;
