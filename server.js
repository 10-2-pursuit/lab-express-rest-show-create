const app = require("./app")

require("dotenv").config();
PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})