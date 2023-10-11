const express = require("express");

const logs = express.Router();

let logsArray = require("../models/log.model.js");

logs.get("/", (req, res) => {
    res.send(logsArray);
})

module.exports = logs;