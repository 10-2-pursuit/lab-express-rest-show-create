const express = require("express");
const logs = express.Router();
const logData = require("../models/log");

logs.get("/", (req, res) => {
  console.log("accessing log data");
  res.json(logData);
});

logs.get("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (logData[arrayIndex]) {
    res.json(logData[arrayIndex]);
  } else {
    res.redirect("/logs/404");
    res.status(404).send("No log detected at that index");
  }
});

logs.post("/", (req, res) => {
  const newLog = req.body;
  logData.push(newLog);
  res.status(200).json();
});

logs.put("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (logData[arrayIndex]) {
  logData[arrayIndex] = req.body
  res.status(200).json(logData[arrayIndex])
  } else {
    res.redirect("/logs/404");
    res.status(404).send("No log detected at that index");
  }
});

logs.delete("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (logData[arrayIndex]) {
    const deletedLog = logData.splice(arrayIndex, 1);
    res.status(200).json(deletedLog[0]);
  } else {
    res.status(404).json({ error: "Could not find log to delete." });
  }
});

module.exports = logs;
