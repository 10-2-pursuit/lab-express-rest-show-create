const express = require('express'); 
const app = express(); 

app.use(express.static('public')); 

const logs = require("./controllers/logscontroller");

app.use(express.json());
app.use("/logs", logs);

app.use(express.urlencoded({extended: true}));

app.use('*', (req, res)=> {
    res.status(404).sendFile(--__dirname + '/public/404.html');
});


module.exports = app