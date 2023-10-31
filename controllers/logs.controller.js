const express = require('express');
const router = express.Router();
const logsArray = require('../models/log.js');
// Middleware to handle query parameters
router.use((req, res, next) => {
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

  req.logsArray = filteredLogs;
  next();
});

// Route to display filtered/sorted logs
router.get('/logs', (req, res) => {
  res.json(req.logsArray);
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

router.post('/logs', (req, res) => {
  try {
    const newLog = req.body;

    if (!validateLogEntry(newLog)) {
      return res.status(400).json({ error: 'Invalid log entry data' });
    }

    const newLogId = logsArray.length;
    const newLogEntry = {
      id: newLogId,
      captainName: newLog.captainName,
      title: newLog.title,
      post: newLog.post,
      mistakesWereMadeToday: newLog.mistakesWereMadeToday,
      daysSinceLastCrisis: newLog.daysSinceLastCrisis,
    };

    logsArray.push(newLogEntry);

    return res.status(201).json({ status: 'OK', payload: newLogEntry });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/logs/:id', (req, res) => {
  try {
    const logId = parseInt(req.params.id, 10);
    const updatedLog = req.body;

    if (isNaN(logId)) { 
      return res.status(400).json({ error: 'Invalid log ID' });
    }
    if (!validateLogEntry(updatedLog)) {
      return res.status(400).json({ error: 'Invalid log entry data' });
    }

    const updatedLogEntry = {
      id: logId,
      captainName: updatedLog.captainName,
      title: updatedLog.title,
      post: updatedLog.post,
      mistakesWereMadeToday: updatedLog.mistakesWereMadeToday,
      daysSinceLastCrisis: updatedLog.daysSinceLastCrisis,
    }
    logsArray[logId] = updatedLogEntry;

    return res.status(200).json({ status: 'OK', payload: updatedLogEntry });
  }
  catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
})

router.delete(
  '/logs/:id',
  (req, res) => {
    try {
      const logId = parseInt(req.params.id, 10);
      if (isNaN(logId)) {
        return res.status(400).json({ error: 'Invalid log ID' });
      }
      delete logsArray[logId];
      return res.status(200).json({ status: 'OK' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });  
  }
  }
)




module.exports = router;