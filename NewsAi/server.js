require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {loggerMiddleware} = require("./server/middleware/loggerMiddleware");
const {errorHandler} = require("./server/middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./server/services/swagger/swagger-output.json");
const newsAiLogger = require("./server/services/logger/logger");
const newsAi = require("./server/routes/newsAi");
const bodyParser = require("body-parser");
const app = express();
app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/news-ai", newsAi);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const port = process.env.PORT;

app.use(errorHandler);
app.listen(port, async () => {
    newsAiLogger.info(`News ai Server started on port - ${port}`);
})