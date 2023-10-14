const express = require('express'); 
const logs = require("./controllers/logscontroller");

const app = express(); 

app.use(express.json());
app.use("/logs", logs);

app.use(express.urlencoded({extended: true}));

app.use((err, req, res, next)=> {
 if(err) {
    if (err.status === 404){
        res.status(404).send('Not Found');
    } else if (err.name === "ValidationError"){
        res.status(400).json({error: "Validation failed", details: err.details });
    } else {
        res.status(500).send("internal Server Error");
    }

    } else{
        next();
    }
})
module.exports = app