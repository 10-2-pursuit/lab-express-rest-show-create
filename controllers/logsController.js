const express = require("express");

const logs = express.Router();

const logsData = require("../models/logs");

// this is our index route for http://localhost:8080/logs
logs.get("/", (req, res) => {
    // what we want to do with the API/Json data 
    console.log("sending all log data")
    // headers possibly may only accept APP/JSON
    res.json(logsData);
})