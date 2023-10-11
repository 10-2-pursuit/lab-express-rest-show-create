const express = require("express")

const logsController = require("./controllers/logsController.js")


const app = express()


app.use("/logs", logsController)


module.exports = app
