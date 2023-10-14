const express = require("express");
const logs = require("./controllers/log.controller.js");

const app = express();

app.use(express.json());

app.use("/logs", logs);

app.get("/", (req, res) => {
  res.send("Welcome to the captain's log!");
});

app.use("/404", (req, res) => {
    res.status(404).json({error: "Log could not be located."});
  });

module.exports = app;
