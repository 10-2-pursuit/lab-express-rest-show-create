const express = require("express")
const logs = express.Router()
const logsArray = require("../models/log.js")

logs.get("/", (req,res) => {
    res.json(logsArray)
})

logs.post("/", (req,res) => {
    //console.log("hi")
    logsArray.push(req.body)
    res.status(200).json({status: "OK", payload: logsArray[logsArray.length-1]   })
    //console.log(logsArray.length)
    //console.log(logsArray)
})

logs.get("/:arrayIndex", (req,res) => {
   if(logsArray[req.params.arrayIndex]){
        res.json(logsArray[req.params.arrayIndex])
   }
    else{
       res.status(404).json({error: "invalid index"})
    }
})

module.exports = logs