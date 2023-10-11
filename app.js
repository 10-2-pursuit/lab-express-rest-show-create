// "delivering the car:"
const express = require("express");
const logs = require("./controllers/logsController");
// "express() is turning on the car"
// 'app' is the name of our car
const app = express();

app.use(express.json());
app.use("/logs",logs);