const express = require('express');
const logsRouter = express.Router();
const logsArray = require('../models/log.js');
const bodyParser = require('body-parser');

// Middleware to handle query parameters
logsRouter.use((req, res, next) => {
  const { order, mistakes, lastCrisis } = req.query;
  let filteredLogs = logsArray.slice(); // Clone the array to avoid modifying the original

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
logsRouter.get('/logs', (req, res) => {
  res.json(req.filteredLogs);
});

// Function to validate log entry data
function validateLogEntry(entry) {
  return (
    typeof entry.captainName === 'string' &&
    typeof entry.title === 'string' &&
    typeof entry.post === 'string' &&
    typeof entry.mistakesWereMadeToday === 'boolean' &&
    typeof entry.daysSinceLastCrisis === 'number'
  );
}

// Route to add a new log entry
logsRouter.post('/logs', (req, res) => {
  try {
    const newLog = req.body;

    // Check if the request data is a valid log entry
    if (!validateLogEntry(newLog)) {
      return res.status(400).json({ error: 'Invalid log entry data' });
    }

    const newLogId = logsArray.length;

    // Create a new log entry with the generated ID
    const newLogEntry = {
      id: newLogId,
      captainName: newLog.captainName,
      title: newLog.title,
      post: newLog.post,
      mistakesWereMadeToday: newLog.mistakesWereMadeToday,
      daysSinceLastCrisis: newLog.daysSinceLastCrisis,
    };

    // Add the new log entry to the logsArray
    logsArray.push(newLogEntry);

    return res.status(201).json({ status: 'OK', payload: newLogEntry });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to retrieve all log entries
logsRouter.get('/', (req, res) => {
  res.json(logsArray);
});

// Route to retrieve a single log entry by ID
logsRouter.get('/:index', (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < logsArray.length) {
    res.status(200).json(logsArray[index]);
  } else {
    res.redirect('/logs');
    res.status(404).send('No log entry at that index');
  }
});

// Route to delete a log entry by ID
logsRouter.delete('/:arrayIndex', (req, res) => {
  const { arrayIndex } = req.params;
  if (arrayIndex >= 0 && arrayIndex < logsArray.length) {
    const deletedLog = logsArray.splice(arrayIndex, 1);
    res.status(200).json(deletedLog[0]);
  } else {
    res.status(404).json({ error: 'Could not locate log entry to be deleted' });
  }
});

module.exports = logsRouter;
