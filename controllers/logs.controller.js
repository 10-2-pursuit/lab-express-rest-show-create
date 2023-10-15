const express = require("express");
const logs = express.Router();

const logsData = require("../models/log.model");

logs.get("/", (req, res) => {
    console.log("Sending all log data.")
    res.send(logsData);
});

logs.get("/:id", (req, res) => {
    const {id} = req.params;
    console.log(`Showing log at ${id}`)

    if(logsData[id]) {
        res.status(200).json(logsData[id])
    } else {
        res.redirect('/');
    }
})

logs.post("/", (req, res) => {
    
    const newLog = {
        captainName: "Picard",
        title: "Stars",
        post: "Today I contemplated that there sure are a lot of stars in the sky",
        mistakesWereMadeToday: true,
        daysSinceLastCrisis: "10",
      };

    logsData.push(newLog);
    res.status(200).json(newLog);
})

logs.delete("/:logIndex", (req, res) => {
    const { logIndex } = req.params;

    if (logsData[logIndex]) {
        logsData[logIndex] = req.body;
        const deletedLog = logsData.splice(logIndex, 1);
        res.status(200).json((logsData[logIndex]))
    } else {
        res.status(404).send("No log for this ID.");
    }
})

module.exports = logs;