const express = require("express")

const captainLogs = require("./controllers/captainLogsContoller")

const app = express();
const cors = require("cors");

app.use(cors())
app.use(express.json())

// this is where we use CORS
app.use("/logs", captainLogs);

app.get("/", (req, res) => {
    res.send("Welcome to the captain's log")
})

app.get("*", (req, res) => {
    res.status(404).json({error: "no page found "})
})

module.exports = app;