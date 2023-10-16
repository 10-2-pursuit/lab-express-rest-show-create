const express = require("express")

const logsController = require("./controllers/logsController.js")


const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.use("/logs", logsController)


module.exports = app
