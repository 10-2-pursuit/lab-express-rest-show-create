const express = require('express');
const router = express.Router();
const logsArray = require('../models/log.js');
const supertest = require('supertest');

// Middleware to handle query parameters
router.use((req, res, next) => {
  const { order, mistakes, lastCrisis } = req.query;
  let filteredLogs = logsArray; // Initialize with all logs

  // Sort the log entries by captainName
  if (order === 'asc') {
    filteredLogs.sort((a, b) => a.captainName.localeCompare(b.captainName));
  } else if (order === 'desc') {
    filteredLogs.sort((a, b) => b.captainName.localeCompare(a.captainName));
  }

  // Filter logs based on mistakes query parameter
  if (mistakes === 'true') {
    filteredLogs = filteredLogs.filter((log) => log.mistakesWereMadeToday === true);
  } else if (mistakes === 'false') {
    filteredLogs = filteredLogs.filter((log) => log.mistakesWereMadeToday === false);
  }

  // Filter logs based on lastCrisis query parameter
  if (lastCrisis) {
    if (lastCrisis.startsWith('gte')) {
      const threshold = parseInt(lastCrisis.slice(3), 10);
      filteredLogs = filteredLogs.filter((log) => log.daysSinceLastCrisis >= threshold);
    } else if (lastCrisis.startsWith('gt')) {
      const threshold = parseInt(lastCrisis.slice(2), 10);
      filteredLogs = filteredLogs.filter((log) => log.daysSinceLastCrisis > threshold);
    } else if (lastCrisis.startsWith('lte')) {
      const threshold = parseInt(lastCrisis.slice(3), 10);
      filteredLogs = filteredLogs.filter((log) => log.daysSinceLastCrisis <= threshold);
    } else if (lastCrisis.startsWith('lt')) {
      const threshold = parseInt(lastCrisis.slice(2), 10);
      filteredLogs = filteredLogs.filter((log) => log.daysSinceLastCrisis < threshold);
    }
  }

  req.filteredLogs = filteredLogs;
  next();
});

// Route to display filtered/sorted logs
router.get('/logs', (req, res) => {
  res.json(req.filteredLogs);
});




router.post("/", (req, res) => {
  try {
    // Create a log object from the request body
    const newLog = {
      captainName: req.body.captainName,
      title: req.body.title,
      post: req.body.post,
      mistakesWereMadeToday: req.body.mistakesWereMadeToday,
      daysSinceLastCrisis: req.body.daysSinceLastCrisis,
    };

    // Add the new log entry to the in-memory array
    logsArray.push(newLog);

    res.status(201).json(newLog); // Return the newly created log entry
  } catch (error) {
    res.status(400).json({ message: "Error creating log entry", error });
  }
});

// GET route to retrieve all log entries
router.get("/", (req, res) => {
  res.json(logsArray);
});
router.get('/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);

  if (!isNaN(index) && index >= 0 && index < logsArray.length) {
    const log = logsArray[index];
    res.json(log);
  } else {
    res.redirect('/404');
  }
});

// Delete route to delete a log entry by index
router.delete('/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);

  if (!isNaN(index) && index >= 0 && index < logsArray.length) {
    logsArray.splice(index, 1); // Remove the entry at the specified index
    res.status(204).send(); // Return a successful response with no content
  } else {
    res.status(404).send('Log not found');
  }
});


function validateLogEntry(entry) {
  if (
    typeof entry.captainName === 'string' &&
    typeof entry.title === 'string' &&
    typeof entry.post === 'string' &&
    typeof entry.mistakesWereMadeToday === 'boolean' &&
    typeof entry.daysSinceLastCrisis === 'number'
  ) {
    return true;
  }
  return false;
}

// In your create route, add the validation before pushing new data:
router.post('/logs', (req, res) => {
  const newLog = req.body;

  if (validateLogEntry(newLog)) {
    // Push the new log entry into your data source array
    // Send a success message
  } else {
    res.status(400).send('Invalid log entry data');
  }
});

module.exports = router;
