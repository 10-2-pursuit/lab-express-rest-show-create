// Inside logsController.js
const express = require('express');
const router = express.Router();
const logsArray = require('../models/log.js');

// Display index data as HTML
router.get('/', (req, res) => {
  const logList = logsArray.map((log, index) => {
    return `<a href="/v2/logs/${index}">${log.title}</a><br>`;
  });
  res.send(`<ul>${logList.join('')}</ul>`);
});

// Display show data as HTML
router.get('/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (isNaN(index) || index < 0 || index >= logsArray.length) {
    response.redirect('/v2/logs')
    res.send('incorrect index provided');
  } else {
    const log = logsArray[index];
    res.send(`<h1>${log.title}</h1><p>${log.post}</p>`);
  }
});

module.exports = router;
