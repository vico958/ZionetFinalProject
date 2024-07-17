require("dotenv").config()
const express = require("express");
const cors = require("cors");
const {loggerMiddleware} = require("./server/middleware/loggerMiddleware");
const {errorHandler} = require("./server/middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./server/services/swagger/swagger-output.json");
const userLogger = require("./server/services/logger/logger");
const bodyParser = require("body-parser");
const user = require("./server/routes/user")
const app = express();


const port = process.env.PORT;


app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", user)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

app.listen(port, async () =>{
    userLogger.info(`User server started on port - ${port}`)
})