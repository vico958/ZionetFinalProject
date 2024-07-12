require("dotenv").config();
const { sendDailyNews } =require("./server/services/general")
const cron = require('node-cron');
const express = require("express");
const cors = require("cors");
const {logger} = require("./server/middleware/logger");
const {errorHandler} = require("./server/middleware/errorHandler");
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

app.get("/", (req, res) =>{
  res.send("hello world news app")
})

app.listen(port, () => {
    console.log("Server started on port", port)
})

app.use(errorHandler);

cron.schedule('0 22 * * *', () => {
  console.log('Running daily news job at 10:00 PM Israel Time');
  sendDailyNews();
}, {
  scheduled: true,
  timezone: "Asia/Jerusalem"
});
