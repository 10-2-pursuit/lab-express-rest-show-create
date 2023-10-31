const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const logsController = require('./controllers/logs.controller');

// Middleware for parsing JSON
app.use(bodyParser.json());

// 404 route
app.get('/404', (req, res) => {
  res.status(404).send('Page not found');
});

// Use the logsController for all routes
app.use('/', logsController);





module.exports = app;
