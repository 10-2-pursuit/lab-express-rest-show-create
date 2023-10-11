const express = require("express");

const logs = express.Router();

let logsArray = require("../models/log.js");

logs.get("/", (req, res) => {
    res.send(logsArray);
})

logs.get("/:index", (req, res) => {
    const {index} = req.params;
    if(logsArray[index]) {
        res.status(200).send(logsArray[index]);
    } else {
        res.redirect("/")
    }
})

logs.post("/", (req, res) => {
    logsArray.push(req.body);
    res.status(200).send(logsArray[logsArray.length - 1])
})

logs.delete("/:index", (req, res) => {
    const {index} = req.params;
    logsArray.splice(index, 1);
    res.status(200).send(logsArray)
})

module.exports = logs;