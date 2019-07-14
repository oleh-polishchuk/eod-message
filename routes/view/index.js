const express = require('express');
const router = express.Router();
const path = require('path');

const sendIndexHtml = (req, res) => res.sendFile(path.resolve(__dirname, "../../public/build/index.html"));

router.get('/', sendIndexHtml);
router.get('/reports', sendIndexHtml);
router.get('/eod-message', sendIndexHtml);

module.exports = router;
