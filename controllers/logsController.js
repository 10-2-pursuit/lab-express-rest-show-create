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
        res.redirect("/logs/9001")
    }
});

logs.post("/", (req, res) => {
    logsData.push(req.body, "<----- this our body")
    res.status(200).json({status: ok , payload: logsData[logsData.length -1]})
})

logs.delete("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params
    if(logsData[arrayIndex]) {
        const deletedLog = logsData.splice(arrayIndex, 1)
        res.send(200).json(deletedLog[0])
    } else {
        res.send(400).json({error: "Could no located index"})
    }
})

logs.put("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params 
    if(logsData[arrayIndex]) {
        logsData[arrayIndex] = req.body
        res.status(200).json(logsData[arrayIndex])
    } else {
        res.status(404).json("Cannot be updated bookmarks does not exist")
    }
})


module.exports = logs