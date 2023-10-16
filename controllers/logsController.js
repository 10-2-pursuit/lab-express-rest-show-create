const express = require("express")
const logs = express.Router()
let logArray = require("../models/log")


logs.delete("/:arrayIndex", (req, res) => {

    const { arrayIndex } = req.params;

    if(logArray[arrayIndex]) {
        logArray.splice(arrayIndex,1)
        res.status(303).json(logArray)
    } else { 
        res.status(404).redirect()
    }

})

logs.post("/", (req, res) => {
    console.log("Post request recieved.")
    logArray.push(req.body)
    res.status(303).json(logArray)
})

logs.put("/:arrayIndex", (req, res) => {
    const {arrayIndex} = req.params

    console.log(`Put request at index ${arrayIndex}`)

    if(logArray[arrayIndex]) {
        logArray.splice(arrayIndex,1,req.body)
        res.status(303).json(logArray)
    } else {
        res.status(404).redirect()
    }
})

logs.get("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    

    console.log(`Request made for index ${arrayIndex}`)
    if(logArray[arrayIndex]) {
        res.status(200).json(logArray[arrayIndex])
    } else {
        res.status(404).redirect()
    }
})

logs.get("/", (req, res) => {
    console.log("request for all made")
    res.json(logArray)
})




module.exports = logs