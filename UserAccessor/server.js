require("dotenv").config()
const express = require("express");
const cors = require("cors");
const {logger} = require("./server/middleware/logger");
const bodyParser = require("body-parser");
const userAccessor = require("./server/routes/userAccessor")

const app = express();
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user-accessor", userAccessor)
const port = process.env.port || "3003";


app.listen(port, () =>{
    console.log("Server started on port", port)
})

app.get("/", (req, res) =>{
    res.send("hello world user service")
})