const express = require("express")

const captainLogs = require("./controllers/captainLogsContoller")

const app = express();

app.use(express.json())
// this is where we use CORS
app.use("/logs", captainLogs);

app.get("/", (req, res) => {
    res.send("Welcome to the captain's log")
})

app.get("/404", (req, res) => {
    res.send(`#	Action	URL	HTTP Verb	CRUD	Description
    2	Show	/logs/:id	GET	Read	Get an individual view (show one log)
    3	Create	/logs	POST	Create	Create a new log
    `)
})

module.exports = app;