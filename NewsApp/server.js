require("dotenv").config();
const { sendDailyNews } =require("./server/services/general/general")
const cron = require('node-cron');
const express = require("express");
const cors = require("cors");
const {loggerMiddleware} = require("./server/middleware/loggerMiddleware");
const {errorHandler} = require("./server/middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./server/services/swagger/swagger-output.json");
const newsAppLogger = require("./server/services/logger/logger");
const news = require("./server/routes/news");
const bodyParser = require("body-parser");
const app = express();
app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/news", news);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const port = process.env.PORT;

app.listen(port, () => {
  newsAppLogger.info(`News app server started on port - ${port}`)
})

app.use(errorHandler); // errorHandler middleware should be the last one the app use

/*
was not asked in project for but i think its good idea to send news each day as well
*/
cron.schedule('0 22 * * *', () => {
  newsAppLogger.info('Running daily news job at 10:00 PM Israel Time');
  sendDailyNews();
}, {
  scheduled: true,
  timezone: "Asia/Jerusalem"
});
