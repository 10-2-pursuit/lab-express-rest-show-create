const express = require("express");

const logs = express.Router();

const logsData = require("../models/log")

logs.get("/", (req, res) => {
    res.json(logsData);
});

logs.get("/:index", (req, res) => {
    const { index } = req.params;
    if(logsData[index]) {
        res.json(logsData[index])
    } else {
        res.status(404).send("No logs data found at index")
    }
});

logs.post("/", (req, res) => {
    logsData.push({captainName: "Picard",
    title: "Stars",
    post: "Today I contemplated that there sure are a lot of stars in the sky",
    mistakesWereMadeToday: true,
    daysSinceLastCrisis: "10", })
    res.status(200).json(logsData[logsData.length -1])
})


module.exports = logs