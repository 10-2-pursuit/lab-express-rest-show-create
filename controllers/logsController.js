const express = require("express");
const logs = express.Router();
const logsArray = require('../models/log.js');
const validateURL = require("../models/validateURL.js");
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

logs.get("/", (req, res) => {
    if(req.query.length > 0){
        let queryResult = logsArray;
        if(req.query){
            switch(req.query.order){
                case "asc": 
                    queryResult = queryResult.sort((prev, next) => {return (prev.captainName.toLowerCase() > next.captainName.toLowerCase()) ? 1 : (prev.captainName.toLowerCase() < next.captainName.toLowerCase()) ? -1 : 0});
                    break;
                case "desc": 
                    queryResult = queryResult.sort((prev, next) => {return (prev.captainName.toLowerCase() > next.captainName.toLowerCase()) ? -1 : (prev.captainName.toLowerCase() < next.captainName.toLowerCase()) ? 1 : 0});
                    break;
                default:
            };
            /*
                - `/logs?lastCrisis=gt10` it will return all the logs where the `daysSinceLastCrisis`is **g**reater **t**than 10
                - `/logs?lastCrisis=gte20`it will return all the logs where the `daysSinceLastCrisis`is **g**reater **t**than or **e**qual to 20
                - `/logs?lastCrisis=lte5`it will return all the logs where the `daysSinceLastCrisis`is **l**ess **t**than or **e**qual to 5
            */
            switch(req.query.mistakes){
                case "true":    
                    queryResult = queryResult.filter(singleLog => singleLog.mistakesWereMadeToday == "true");
                    break;
                case "false": 
                    queryResult = queryResult.filter(singleLog => singleLog.mistakesWereMadeToday == "false");
                    break;
                default:
            }
        }
    }
    res.status(200).json(logsArray);
});

logs.get("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    if(Number(arrayIndex) != NaN && (Number(arrayIndex) >= 0 && Number(arrayIndex) < logsArray.length)){
        res.json(logsArray[Number(arrayIndex)]);
    }
    res.status(202).redirect("/9001");
});

// 404 Page not found
logs.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
});

logs.post("/", jsonParser, (req, res) => {
    logsArray.push(req.body);
    res.status(201).json(logsArray[logsArray.length - 1]);
});

logs.delete("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    if(Number(arrayIndex) >= 0 && Number(arrayIndex) < logsArray.length && Number(arrayIndex) != NaN){
        logsArray.splice(Number(arrayIndex), 1);
        res.status().send(`deletes at the index in the logs array`);
    }
    res.status(202).redirect("/9001");
});

logs.put("/:arrayIndex", jsonParser, (req, res) => {
    const { arrayIndex } = req.params;
    if(Number(arrayIndex) >= 0 && Number(arrayIndex) < logsArray.length && Number(arrayIndex) != NaN){
        logsArray.splice(Number(arrayIndex), 1, req.body);
        res.status(200).send(logsArray[Number(arrayIndex)]);
    }
    res.status(202).redirect("/9001");
});

module.exports = logs;