const express = require('express');
const router = express.Router();
const logsArray = require('../models/log.js');

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

router.get('/:index', (req, res) => {
  const index = req.params.index; // Parse the index parameter as an integer
  if (!([index])) {
    // Check if the index is invalid
    res.status(404).send('Log not found');
  } else {
    // Retrieve and send the log at the specified index

    res.json(filteredLogs[index]);
  }
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

module.exports = router;
