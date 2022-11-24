const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

const engRoute = require("./routes/eng");
const vieRoute = require("./routes/vie");
const topicRoute = require("./routes/topic");

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log("Connected to mongodb server!");
});

port = 8000;

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(morgan("common"));

app.get("/test-api", (req, res) => {
    res.status(200).json("Everything is great!");
})

app.use("/v1/eng", engRoute);
app.use("/v1/vie", vieRoute);
app.use("/v1/topic", topicRoute);

app.listen(port, () => {
    console.log("Server is running...");
})