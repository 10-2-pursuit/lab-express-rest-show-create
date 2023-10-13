const express = require("express");
const logs = require("./controllers/log.controller.js");

const app = express();

app.use(express.json());

app.use("/logs", logs);

app.get("/", (req, res) => {
  res.send("Welcome to the captain's log!");
});

app.use("*", (req, res) => {
  res.status(404).send("No logs found.");
});

module.exports = app;
