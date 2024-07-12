require("dotenv").config()
const express = require("express");
const cors = require("cors");
const {loggerMiddleware} = require("./server/middleware/loggerMiddleware");
const {errorHandler} = require("./server/middleware/errorHandler");
const userLogger = require("./server/services/logger");
const bodyParser = require("body-parser");
const user = require("./server/routes/user")
const app = express();
app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", user)
const port = process.env.port || "3002";



app.get("/", (req, res) =>{
    userLogger.info("hello world user service")
    res.send("hello world user service")
})

app.use(errorHandler);

app.listen(port, async () =>{
    userLogger.info(`Server started on port - ${port}`)
})