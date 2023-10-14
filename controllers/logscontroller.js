const express = require("express");

const logs = express.Router();

const logsData = require("../models/log")

logs.get("/", (req, res) => {
    res.json(logsData);
});

logs.get("/:index", (req, res) => {
    const { index } = req.params;
    if(index< 0 || index >= logsData.length) {
        res.redirect("/logs")
    } else {
        res.json(logsData[index]);
    }
});

logs.delete("/:index", (req, res) =>{
    const { index } = req.params;
   if ( index < 0 || index >= logsData.length){
    res.status(404).send("No logs data found at index");
   } else{ 
     logsData.splice(index, 1);
     res.status(204).send();
   }
});

logs.post("/", (req, res) => {
   const  {captainName, title, post ,mistakesWereMadeToday, daysSinceLastCrisis } = req.body;
   const newLog = {
    captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis,
};
logsData.push(newLog);

   res.status(200).json(newLog);
});


module.exports = logs