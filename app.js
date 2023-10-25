const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const logsController = require('./controllers/logs.controller');

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use logsController for handling log-related routes
app.use('/logs', logsController);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

 
module.exports =  app;
