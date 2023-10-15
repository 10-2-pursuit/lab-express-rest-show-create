// DEPENDENCIES
const express = require('express');
const logs = require('./controllers/logsController.js');

// CONFIGURATION
const app = express();
// const cors = require('cors');
// app.use(cors());

// MIDDLEWARE
app.use(express.json());
app.use('/logs', logs);

// ROUTES
app.get('/', (req, res) => {
	res.send(`Welcome to the Captain's Log App! Live Long and Prosper 🖖!`);
});

// 404 Page not found
app.get('*', (req, res) => {
	res.status(404).json({ error: 'Page not found' });
});

// EXPORT
module.exports = app;
