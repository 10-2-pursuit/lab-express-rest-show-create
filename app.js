const express = require('express'); 
const logs = require("./controllers/logscontroller");

const app = express(); 

app.use(express.json());
app.use("/logs", logs);

app.use(express.urlencoded({extended: true}));

module.exports = app