const express = require("express");
const app = express();
const logsController = require('./controllers/logsController.js');

app.get("/", (request, response) => {
    response.send("Hello, world!");
});

app.use("/logs", logsController);

// 404 Page not found
app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
});

module.exports = app;