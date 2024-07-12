require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {loggerMiddleware} = require("./server/middleware/loggerMiddleware");
const {errorHandler} = require("./server/middleware/errorHandler");
const newsDataLogger = require("./server/services/logger");
const newsData = require("./server/routes/newsData");
const bodyParser = require("body-parser");
const app = express();
app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/news-data", newsData);
const port = process.env.port || "3004";

app.get("/", (req, res) =>{
    newsDataLogger.info("Hello world from news data service")
    res.send("Hello world from news data service")
})
app.use(errorHandler);

app.listen(port, () => {
    newsDataLogger.info(`News data server started on port - ${port}`)
})