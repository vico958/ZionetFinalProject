require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {logger} = require("./server/middleware/logger");
const newsData = require("./server/routes/newsData");
const bodyParser = require("body-parser");
const app = express();
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/news-data", newsData);
const port = process.env.port || "3004";

app.listen(port, () => {
    console.log("Server started on port", port)
})
app.get("/", (req, res) =>{
    res.send("hello world news data engine")
})
