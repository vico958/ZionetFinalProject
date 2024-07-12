require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {loggerMiddleware} = require("./server/middleware/loggerMiddleware");
const {errorHandler} = require("./server/middleware/errorHandler");
const newsAiLogger = require("./server/services/logger");
const newsAi = require("./server/routes/newsAi");
const bodyParser = require("body-parser");
const app = express();
app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/news-ai", newsAi);
const port = process.env.port || "3005";
app.get("/", (req, res) =>{
    newsAiLogger.info("Hello world news ai service");
    res.send("Hello world news ai service");
})
app.use(errorHandler);
app.listen(port, async () => {
    newsAiLogger.info(`News ai Server started on port - ${port}`);
})