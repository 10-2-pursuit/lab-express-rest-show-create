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

logs.delete("/:arrayIndex", (req,res) => {
    if(logsArray[req.params.arrayIndex]){
        const deletedLog = logsArray.splice(req.params.arrayIndex, 1)
        //res.status(200).json(deletedLog[0])
        res.redirect("/logs")
    }
    else
        res.status(404).json({error: "Not Found"})
})

module.exports = logs