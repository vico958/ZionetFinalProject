require("dotenv").config()
const express = require("express");
const cors = require("cors");
const {loggerMiddleware} = require("./server/middleware/loggerMiddleware");
const {errorHandler} = require("./server/middleware/errorHandler");
const emailLogger = require("./server/services/logger");
const bodyParser = require("body-parser");
const email = require("./server/routes/email")

const app = express();
app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/email", email)
const port = process.env.port || "3006";

app.get("/", (req, res) =>{
    emailLogger.info("hello world email service");
    res.send("hello world email service");
})
app.use(errorHandler);
app.listen(port, async () =>{
    emailLogger.info(`Email server started on port - ${port}`)
})