require("dotenv").config()
const express = require("express");
const cors = require("cors");
const {logger} = require("./server/middleware/logger");
const {errorHandler} = require("./server/middleware/errorHandler");
const bodyParser = require("body-parser");
const email = require("./server/routes/email")

const app = express();
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/email", email)
const port = process.env.port || "3006";

app.get("/", (req, res) =>{
    res.send("hello world email service")
})
app.use(errorHandler)
app.listen(port, async () =>{
    onsole.log("Server started on port", port)
})