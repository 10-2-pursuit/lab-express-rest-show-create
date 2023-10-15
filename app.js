const express = require("express");
const logs = require("./controllers/logs.controller");
const app = express();

app.use("/logs", logs);

//app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Captain's Log");
});

app.get("*", (req, res) => {
    res.status(404).json({error: "Sorry, no page found!"})
});

module.exports = app;