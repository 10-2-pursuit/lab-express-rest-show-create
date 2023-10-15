const express = require("express");

const logs = express.Router();

const logsData = require("../models/log");


logs.get("/", (req, res) => {
    
    console.log("sending all logs data")
   
    res.json(logsData);
})


logs.get("/:index", (req, res) => {
    const { index } = req.params;
    console.log(`SHOWING INDEX #${index}`)
    if (logsData[index]) {
        res.status(200).json(logsData[index])
    } else {
        res.redirect(302, `/9001`)
    }
})

logs.post("/", (req, res) => {
    console.log("post route was hit!@#@!#!");
    console.log(req.body, " <------ this is the req body sent from user")
    logsData.push(req.body);
    res.status(200).json( {status: "OK", payload: logsData[logsData.length - 1]} )
})



logs.delete("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params
    if (logsData[arrayIndex]){
        const deletedLog = logsData.splice(arrayIndex, 1)
        res.status(200).json(deletedLog[0])
    }else{
        res.status(404).json({errror: "Could not locate log to be deleted!"})
    }  
})

logs.put("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params
    if (logsData[arrayIndex]){
        logsData[arrayIndex] = req.body
        res.status(200).json((logsData[arrayIndex]))
    } else{
        res.status(404).json({error: "Could not locate bookmark to be updated"})
    }
})
module.exports = logs;