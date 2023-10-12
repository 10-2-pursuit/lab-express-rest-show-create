const express = require('express');
const app = express();
const logsController = require('./controllers/logs.controller.js');

// Middleware for query parameters
app.use(logsController);

app.use("/logs", logsController);



// 404 route
app.use("/404",(req, res) => {
    res.status(404).send('Page not found');
  });
  
// Welcome route
app.get('/', (req, res) => {
  res.send("Welcome to the Captain's Log!");
});

// Show route to display a specific log entry
app.get('/logs/:index', (req, res) => {
  // Forward the request to the logs.controller router
  logsController(req, res);
});


module.exports = app;