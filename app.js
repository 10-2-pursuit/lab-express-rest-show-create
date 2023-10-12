const express = require("express");
const logs = require("./controllers/logsController");
const app = express();

app.use(express.json());
app.use("/logs", logs);

module.exports = app;