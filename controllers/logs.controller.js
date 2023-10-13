
const express = require('express');
const router = express.Router();
const logsArray = require('../models/log.js');
const supertest = require('supertest');
const bodyParser = require('body-parser');


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



const newLogData = [];

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

router.use(bodyParser.json());

router.post('/logs', (req, res) => {
  try {
    const newLog = req.body; // This data is available because of body-parser

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


// Read all log entries


router.get('/logs', (req, res) => {
  return res.json(logsArray);
});

// Read a single log entry by ID
router.get('/logs/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);

  if (!isNaN(index) && index >= 0 && index < logsArray.length) {
    const log = logsArray[index];
    return res.json(log);
  }

  return res.status(404).send('Log not found');
});


router.put('/logs/:index', (req, res) => {
  const logId = index = req.params.id ; // Extract the log ID from the request parameters
  const logToUpdate = router.get('logs/:index') // Updated data comes from the request body

  
  if (!logToUpdate) {
    // Log entry not found
    return res.status(404).json({ success: false, message: 'Log entry not found' });
  }
  const updatedLogData = req.body;
  
  // Update the log entry with the provided data
  logToUpdate.captainName = updatedLogData.captainName;
  logToUpdate.title = updatedLogData.title;
  logToUpdate.post = updatedLogData.post;
  logToUpdate.mistakesWereMadeToday = updatedLogData.mistakesWereMadeToday;
  logToUpdate.daysSinceLastCrisis = updatedLogData.daysSinceLastCrisis;

  // Return a success response
  res.status(200).json({ success: true, message: 'Log entry updated successfully', log: logToUpdate });
});

// Delete a log entry by ID
router.delete('/logs/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);

  if (!isNaN(index) && index >= 0 && index < logsArray.length) {
    logsArray.splice(index, 1); // Remove the entry at the specified index
    return res.status(204).send(); // Return a successful response with no content
  }

  return res.status(404).send('Log not found');
});

module.exports = router;
