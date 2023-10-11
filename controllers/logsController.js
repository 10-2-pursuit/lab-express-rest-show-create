const express = require("express");
const logs = express.Router();
const logsArray = require('../models/log.js');

logs.get("/", (req, res) => {
    res.json(locationsArray);
});

// 404 Page not found
logs.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
});

module.exports = logs;