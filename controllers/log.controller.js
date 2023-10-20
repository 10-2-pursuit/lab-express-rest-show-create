const express = require("express");

const logs = express.Router();

let logsArray = require("../models/log.js");

logs.get("/", (req, res) => {
  const { order, mistakes, lastCrisis } = req.query;
  let sortedLogs = [...logsArray];

  if (order) {
    if (order === "asc") {
      sortedLogs.sort((a, b) => a.captainName.localeCompare(b.captainName));
      res.send(sortedLogs);
    } else if (order === "desc") {
      sortedLogs.sort((a, b) => b.captainName.localeCompare(a.captainName));
      res.send(sortedLogs);
    }
  }

  if (mistakes) {
    if (mistakes === "true") {
      sortedLogs = sortedLogs.filter(
        (log) => log.mistakesWereMadeToday === true
      );
      res.json(sortedLogs);
    } else if (mistakes === "false") {
      sortedLogs = sortedLogs.filter(
        (log) => log.mistakesWereMadeToday === false
      );
      res.json(sortedLogs);
    }
  }

  if (lastCrisis) {
    const match = lastCrisis.match(/(.*?)([0-9]+)/);

    if (match) {
      const operator = match[1];
      const value = parseInt(match[2], 10);

      if (operator === "gt") {
        sortedLogs = sortedLogs.filter(
          (log) => log.daysSinceLastCrisis > value
        );
        res.json(sortedLogs);
      } else if (operator === "gte") {
        sortedLogs = sortedLogs.filter(
          (log) => log.daysSinceLastCrisis >= value
        );
        res.json(sortedLogs);
      } else if (operator === "lt") {
        sortedLogs = sortedLogs.filter(
          (log) => log.daysSinceLastCrisis < value
        );
        res.json(sortedLogs);
      } else if (operator === "lte") {
        sortedLogs = sortedLogs.filter(
          (log) => log.daysSinceLastCrisis <= value
        );
        res.json(sortedLogs);
      }
    }
  }

  res.send(logsArray);
});

logs.get("/:index", (req, res) => {
  const { index } = req.params;
  if (logsArray[index]) {
    res.status(200).json(logsArray[index]);
  } else {
    res.redirect("/404");
  }
});

logs.post("/", (req, res) => {
  const newLog = req.body;

  logsArray.push(newLog);
  res.status(201).json(newLog);
});

logs.delete("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;

  if (logsArray[arrayIndex]) {
    const deletedLog = logsArray.splice(arrayIndex, 1);
    res.status(200).json(deletedLog[0]);
  } else {
    res.redirect("/404");
  }
});

logs.put("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  const updatedLog = req.body;

  if (logsArray[arrayIndex]) {
    logsArray[arrayIndex] = updatedLog;
    res.status(200).json(updatedLog);
  } else {
    res.redirect("/404");
  } 
});

module.exports = logs;
