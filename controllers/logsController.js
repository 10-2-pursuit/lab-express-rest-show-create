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
    logArray.push(req.body)
    res.status(303).json(logArray)
})

logs.get("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    if(logArray[arrayIndex]) {
        res.status(200).json(logArray[arrayIndex])
    } else {
        res.status(404).redirect()
    }
})

logs.get("/", (req, res) => {
    res.json(logArray)
})




module.exports = logs