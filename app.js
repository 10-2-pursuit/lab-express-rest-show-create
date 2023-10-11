const express = require("express");
const app = express();

//app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("*", (req, res) => {
    res.status(404).json({error: "Sorry, no page found!"})
});

module.exports = app;