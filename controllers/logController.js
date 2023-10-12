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
    res.json(logData[arrayIndex])
  } else {
    res.redirect("/logs/404")
    res.status(404).send("No log detected at that index")
  }
});

logs.post("/", (req, res) => {
  logData.push({
    captainName: "Picard",
    title: "Stars",
    post: "Today I contemplated that there sure are a lot of stars in the sky",
    mistakesWereMadeToday: true,
    daysSinceLastCrisis: "10",
  });
  res.status(200).json({ status: "OK", payload: logData[logData.length - 1] });
});

logs.put("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params
    logData[arrayIndex] = {
      captainName: "Picard",
      title: "Courage",
      post: "Courage can be an emotion too.",
      mistakesWereMadeToday: true,
      daysSinceLastCrisis: 100
    }
    res.status(200).json((logData[arrayIndex]))
})

logs.delete("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params
  if (logData[arrayIndex]) {
    const deletedLog = logData.splice(arrayIndex, 1)
    res.status(200).json(deletedLog[0])
  } else {
    res.status(404).json({error: "Could not find log to delete."})
  }
})

module.exports = logs;
