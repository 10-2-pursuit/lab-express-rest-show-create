const express = require("express")
const logs = express.Router()
const logsArray = require("../models/log.js")

logs.get("/", (req,res) => {
    if(req.query.order){
        logsArray.sort((a,b) => {
            if(a.captainName.toLowerCase() < b.captainName.toLowerCase())
                return -1
            else if (a.captainName.toLowerCase() > b.captainName.toLowerCase())
                return 1
            else
                return 0
        })
        if(req.query.order==="asc")
            res.json(logsArray)
        else if(req.query.order==="desc")
            res.json(logsArray.reverse())    
        else
            res.redirect('/9001')
    }
    else if(req.query.mistakes){
        if(req.query.mistakes==="true")
            res.json(logsArray.filter(current => { 
                return current.mistakesWereMadeToday === true
            }))
        else if(req.query.mistakes==="false")
            res.json(logsArray.filter(current => { 
                return current.mistakesWereMadeToday === false
            }))
        else
            res.redirect('/9001')
    }
    else if(req.query.lastCrisis){
        if(req.query.lastCrisis==="gt10")
            res.json(logsArray.filter(current => { 
                return current.daysSinceLastCrisis > 10 
            }))
        else if(req.query.lastCrisis==="gte20")
            res.json(logsArray.filter(current => { 
                return current.daysSinceLastCrisis >= 20 
            }))
        else if(req.query.lastCrisis==="lte5")
            res.json(logsArray.filter(current => { 
                return current.daysSinceLastCrisis <= 5 
            }))
        else
            res.redirect('/9001')
    }
    else
        res.json(logsArray)
})

logs.get("/:order", )

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

logs.put("/:arrayIndex", (req,res) => {
    logsArray[req.params.arrayIndex] = req.body
    res.status(200).json(logsArray[req.params.arrayIndex])
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