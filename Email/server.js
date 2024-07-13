require("dotenv").config()
const express = require("express");
const cors = require("cors");
const {loggerMiddleware} = require("./server/middleware/loggerMiddleware");
const {errorHandler} = require("./server/middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./server/services/swagger/swagger-output.json");
const emailLogger = require("./server/services/logger/logger");
const bodyParser = require("body-parser");
const email = require("./server/routes/email")

const app = express();
app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/email", email)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const port = process.env.port || "3006";

app.use(errorHandler);
app.listen(port, async () =>{
    emailLogger.info(`Email server started on port - ${port}`)
})