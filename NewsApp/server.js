require("dotenv").config();
const cron = require('node-cron');
const express = require("express");
const cors = require("cors");
const {logger} = require("./server/middleware/logger");
const news = require("./server/routes/news");
const bodyParser = require("body-parser");
const app = express();
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/news", news);
const port = process.env.port || "3001";

app.listen(port, () => {
    console.log("Server started on port", port)
})
app.get("/", (req, res) =>{
    res.send("hello world news app")
})

cron.schedule('0 22 * * *', () => {
    console.log('Running daily news job at 10 PM Israel Time');
    sendDailyNews();
  }, {
    scheduled: true,
    timezone: "Asia/Jerusalem"
  });
