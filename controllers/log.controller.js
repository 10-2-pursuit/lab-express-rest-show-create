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

  if (sortedLogs.length === 0) {
    res.redirect("/404");
  } else {
    res.send(logsArray);
  }
});

logs.get("/:index", (req, res) => {
  const { index } = req.params;
  if (logsArray[index]) {
    res.status(200).send(logsArray[index]);
  } else {
    res.redirect("/404");
  }
});

function validateLog(log) {
  if (
    typeof log.captainName === "string" &&
    typeof log.title === "string" &&
    typeof log.post === "string" &&
    typeof log.mistakesWereMadeToday === "boolean" &&
    typeof log.daysSinceLastCrisis === "number"
  ) {
    return true;
  } else {
    return false;
  }
}


logs.post("/", (req, res) => {
    const newLog = req.body;

    if (validateLog(newLog)) {
        console.log("post route was hit!!!!");
        console.log(req.body, "<----- sent from the user!!!!");
        logsArray.push(newLog);
        res.status(201).send(newLog);
    } else {
        res.status(400).send("Invalid log entry data types.");
    }
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
  const updatedLog = req.body;

  if (logsArray[arrayIndex] && validateLog(updatedLog)) {
    logsArray[arrayIndex] = updatedLog;
    res.status(200).send(updatedLog);
  } else if (!logsArray[arrayIndex]) {
    res.redirect("/404");
  } else {
    res.status(400).send("Invalid log entry data types.")
  }
});

module.exports = logs;
