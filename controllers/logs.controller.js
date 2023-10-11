const express = require("express")
const logs = express.Router()
const logsArray = require("../models/log.js")

logs.get("/", (req,res) => {
    res.json(logsArray)
})

logs.get("/:arrayIndex", (req,res) => {
   if(logsArray[req.params.arrayIndex])
        res.json(logsArray[req.params.arrayIndex])
    else
        res.redirect('/9001')
})

logs.post("/", (req,res) => {
    logsArray.push(req.body)
    res.status(200).json({status: "OK", payload: logsArray[logsArray.length-1]})
})

module.exports = logs