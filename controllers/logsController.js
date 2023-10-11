const express = require("express");
const logs = express.Router();
const logsArray = require('../models/log.js');
const validateURL = require("../models/validateURL.js");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

logs.get("/", (req, res) => {
    res.json(logsArray);
});

logs.post("/", jsonParser, (req, res) => {
    console.log(req.body);
    logsArray.push(req.body);
    console.log(logsArray);
    res.json(logsArray[logsArray.length - 1]);
});

logs.get("/:arrayIndex", validateURL, (req, res) => {
    const { arrayIndex } = req.params;
    if(Number(arrayIndex) != NaN && (Number(arrayIndex) >= 0 && Number(arrayIndex) < logsArray.length)){
        res.json(logsArray[Number(arrayIndex)]);
    }
    res.redirect("/9001");
});

logs.get("/9001", (req, res) => {
    res.status(404).json({ error: "Page not found" });
})

// 404 Page not found
logs.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
});

module.exports = logs;