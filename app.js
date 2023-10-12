
const express = require("express");
const logs = require("./controllers/logsController");

const app = express();


app.use(express.json());
app.use("/logs", logs);

const coolest = "Gen";

app.get("/", (req, res) => {
   
    res.send(`Welcome to our express app.`);
})

app.get("*", (req, res) => {
    res.status(404).json({error: "no page found "})
})



module.exports = app;