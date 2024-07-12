require("dotenv").config()
const express = require("express");
const cors = require("cors");
const {logger} = require("./server/middleware/logger");
const {errorHandler} = require("./server/middleware/errorHandler");
const bodyParser = require("body-parser");
const user = require("./server/routes/user")

const app = express();
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", user)
const port = process.env.port || "3002";



app.get("/", (req, res) =>{
    res.send("hello world user service")
})

app.use(errorHandler);

app.listen(port, async () =>{
    console.log("Server started on port", port)
})