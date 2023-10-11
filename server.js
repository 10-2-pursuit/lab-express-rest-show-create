const app = require("./app.js");

require("dotenv").config();

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
    console.log(`%%%%%%%% We are live on port ${PORT} %%%%%%%%`)
});