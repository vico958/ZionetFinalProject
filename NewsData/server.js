require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {loggerMiddleware} = require("./server/middleware/loggerMiddleware");
const {errorHandler} = require("./server/middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./server/services/swagger/swagger-output.json");
const newsDataLogger = require("./server/services/logger/logger");
const newsData = require("./server/routes/newsData");
const bodyParser = require("body-parser");
const app = express();
app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/news-data", newsData);
const port = process.env.PORT;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler); // errorHandler middleware should be the last one the app use

app.listen(port, () => {
    newsDataLogger.info(`News data server started on port - ${port}`)
})