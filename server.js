const app = require("./app");

require("dotenv").config();

const PORT = process.env.PORT || 8282

app.listen(PORT, () => {
    console.log(`We are live on ${PORT}`)
});

