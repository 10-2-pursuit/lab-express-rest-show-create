const express = require("express");

const logs = express.Router();

let logsArray = require("../models/log.js");

logs.get("/", (req, res) => {
  const { order, mistakes, lastCrisis } = req.query;
  let sortedLogs = [...logsArray];

  if (order) {
    if (req.query.order === "asc") {
      sortedLogs.sort((a, b) => a.captainName.localeCompare(b.captainName));
      res.send(sortedLogs);
    } else if (req.query.order === "desc") {
      sortedLogs.sort((a, b) => b.captainName.localeCompare(a.captainName));
      res.send(sortedLogs);
    }
  }

  if (mistakes) {
    if (req.query.mistakes === "true") {
      sortedLogs = sortedLogs.filter(
        (log) => log.mistakesWereMadeToday === true
      );
      res.send(sortedLogs);
    } else if (req.query.mistakes === "false") {
      sortedLogs = sortedLogs.filter(
        (log) => log.mistakesWereMadeToday === false
      );
      res.send(sortedLogs);
    }
  }
  if (lastCrisis) {
    if (req.query.lastCrisis === "gt10") {
      sortedLogs = sortedLogs.filter((log) => log.daysSinceLastCrisis > 10);
      res.send(sortedLogs);
    } else if (req.query.lastCrisis === "gte20") {
      sortedLogs = sortedLogs.filter((log) => log.daysSinceLastCrisis >= 20);
      res.send(sortedLogs);
    } else if (req.query.lastCrisis === "lte5") {
      sortedLogs = sortedLogs.filter((log) => log.daysSinceLastCrisis <= 5);
      res.send(sortedLogs);
    }
  }
  res.send(logsArray);
});

logs.get("/:index", (req, res) => {
  const { index } = req.params;
  if (logsArray[index]) {
    res.status(200).send(logsArray[index]);
  } else {
    res.redirect("/404");
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
    res.redirect("/404");
  }
});

logs.put("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;

  if (logsArray[arrayIndex]) {
    logsArray[arrayIndex] = req.body;
    res.status(200).send(logsArray[arrayIndex]);
  } else {
    res.redirect("/404");
  }
});

module.exports = logs;
