const express = require('express');
const app = express();
const logsController = require('./controllers/logs.controller.js');
const bodyParser = require('body-parser');

// Middleware for query parameters
app.use(bodyParser.json()); // Use bodyParser for parsing JSON data
app.use(logsController);

// Define the 404 route before defining other routes
app.use("/404", (req, res) => {
  res.status(404).send('Page not found');
});


app.put('/logs/:id', logsController);


// Route to handle log submissions
app.post('/logs', logsController);


// Welcome route
app.get('/', (req, res) => {
  res.send("Welcome to the Captain's Log!");
});

// Show route to display a specific log entry
app.get('/logs/:index', (req, res) => {
  // Forward the request to the logsController router
  logsController(req, res);
});



module.exports = app;