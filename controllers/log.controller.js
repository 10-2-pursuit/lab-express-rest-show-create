const express = require("express");

const logs = express.Router();

let logsArray = require("../models/log.js");

logs.get("/", (req, res) => {
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
