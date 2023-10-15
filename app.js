const express = require("express");
const logs = require("./controllers/logController");
const app = express();

app.use(express.json())

app.use("/logs", logs);

app.get("/", (req, res) => {
  res.send("welcome to the captain's log");
});

app.get("*", (req, res) => {
    res.status(404).json({error: "page does not exist"})
})

module.exports = app;
