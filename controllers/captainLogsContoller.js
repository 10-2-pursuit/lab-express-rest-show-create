const express = require("express");

const captainLogs = express.Router();
const captainLogsData = require("../models/log");

captainLogs.get("/", (req, res) => {
    res.json(captainLogsData)
});

captainLogs.post("/", (req, res) => {
    const newLog = req.body;
    // console.log(req)
    captainLogsData.push(newLog)
    res.status(200).json(newLog)
})

captainLogs.get("/:index", (req, res) => {
    const { index } = req.params;
    if (index >= 0 && index < captainLogsData.length) {
        res.status(200).json(captainLogsData[index])
    } else {
        res.redirect(404)
    }
})

captainLogs.delete("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params
    if (captainLogsData[arrayIndex]) {
        const deletedData = captainLogsData.splice(arrayIndex, 1)
        res.status(200).json(deletedData[0])
    } else {
        res.redirect(404)
    }
})

captainLogs.put("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params
    if (captainLogsData[arrayIndex]) {
        captainLogsData[arrayIndex] = req.body
        res.status(200).json((captainLogsData[arrayIndex]))
    } else {
        res.redirect(404)
    }
})

module.exports = captainLogs;