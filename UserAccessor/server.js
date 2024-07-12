require("dotenv").config()
const express = require("express");
const cors = require("cors");
const {loggerMiddleware} = require("./server/middleware/loggerMiddleware");
const {errorHandler} = require("./server/middleware/errorHandler");
const userAccessorLogger = require("./server/services/logger/logger");
const bodyParser = require("body-parser");
const userAccessor = require("./server/routes/userAccessor")
const app = express();
app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user-accessor", userAccessor)
const port = process.env.port || "3003";

app.get("/", (req, res) =>{
    userAccessorLogger.info("Hello world from user accessor service")
    res.send("Hello world from user accessor service")
})
app.use(errorHandler);

app.listen(port, () =>{
    userAccessorLogger.info(`User accessor server started on port - ${port}`)
})
