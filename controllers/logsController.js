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
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length - 1]);
});

logs.get("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    if(Number(arrayIndex) != NaN && (Number(arrayIndex) >= 0 && Number(arrayIndex) < logsArray.length)){
        res.json(logsArray[Number(arrayIndex)]);
    }
    res.redirect("/9001");
});

// 404 Page not found
logs.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
});

logs.delete("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    if(Number(arrayIndex) >= 0 && Number(arrayIndex) < logsArray.length && Number(arrayIndex) != NaN){
        logsArray.splice(Number(arrayIndex), 1);
        res.send(`deletes at the index in the logs array`);
    }
    res.redirect("/9001");
});

logs.put("/:arrayIndex", jsonParser, (req, res) => {
    const { arrayIndex } = req.params;
    if(Number(arrayIndex) >= 0 && Number(arrayIndex) < logsArray.length && Number(arrayIndex) != NaN){
        logsArray.splice(Number(arrayIndex), 1, req.body);
        res.send(logsArray[Number(arrayIndex)]);
    }
    res.redirect("/9001");
});

module.exports = logs;