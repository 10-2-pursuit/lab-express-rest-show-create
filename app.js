const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("welcome to the Captain's log")
})

const logsController = require("./controllers/logs.controller.js")
app.use("/logs", logsController)

app.get("*", (req,res) => {
    res.status(404).json({error: "Sorry, no page found!"})
})

module.exports = app