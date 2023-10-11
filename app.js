const express = require("express")

const app = express()

app.use(express.json())

// app.use((req,res, next) => {
//     //res.status(404).send("invalid index")
//     next()
// })

app.get("/", (req, res) => {
  res.send("welcome to the captain's log")
})

const logsController = require("./controllers/logs.controller.js")
app.use("/logs", logsController)

app.get("*", (req,res) => {
    res.status(404).json({error: "Sorry, no page found!"})
})

module.exports = app