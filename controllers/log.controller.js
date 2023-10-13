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
      res.send(sortedLogs);
    } else if (mistakes === "false") {
      sortedLogs = sortedLogs.filter(
        (log) => log.mistakesWereMadeToday === false
      );
      res.send(sortedLogs);
    }
  }

  if (lastCrisis) {
    if (lastCrisis.startsWith("gt")) {
      let numValue = parseInt(lastCrisis.slice(2), 10);
      sortedLogs = sortedLogs.filter(
        (log) => log.daysSinceLastCrisis > numValue
      );
      res.send(sortedLogs);
    } else if (lastCrisis.startsWith("gte")) {
      let numValue = parseInt(lastCrisis.slice(3), 10);
      sortedLogs = sortedLogs.filter(
        (log) => log.daysSinceLastCrisis >= numValue
      );
      res.send(sortedLogs);
    } else if (lastCrisis.startsWith("lte")) {
      let numValue = parseInt(lastCrisis.slice(3), 10);
      sortedLogs = sortedLogs.filter(
        (log) => log.daysSinceLastCrisis <= numValue
      );
      res.send(sortedLogs);
    }
  }

  if(sortedLogs.length === 0) {
    res.redirect("*");
  } else {
      res.send(logsArray);
  }

});

logs.get("/:index", (req, res) => {
  const { index } = req.params;
  if (logsArray[index]) {
    res.status(200).send(logsArray[index]);
  } else {
    res.redirect("*");
  }
});

logs.post("/", (req, res) => {
  logsArray.push(req.body);
  res.status(200).send(logsArray[logsArray.length - 1]);
});

logs.delete("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;

  if (logsArray[arrayIndex]) {
    const deletedLog = logsArray.splice(arrayIndex, 1);
    res.status(200).send(deletedLog[0]);
  } else {
    res.redirect("*");
  }
});

logs.put("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;

  if (logsArray[arrayIndex]) {
    logsArray[arrayIndex] = req.body;
    res.status(200).send(logsArray[arrayIndex]);
  } else {
    res.redirect("*");
  }
});

module.exports = logs;
