require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { loggerMiddleware } = require("./server/middleware/loggerMiddleware");
const { errorHandler } = require("./server/middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./server/services/swagger/swagger-output.json");
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;
const userAccessorLogger = require("./server/services/logger/logger");
const bodyParser = require("body-parser");
const userAccessor = require("./server/routes/userAccessor");
const app = express();
const port = process.env.PORT;

app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user-accessor", userAccessor);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

const connectToDatabase = async (retries = 3) => {
    while (retries) {
        try {
            userAccessorLogger.info("Trying to connect to db and start server");
            await mongoose.connect(dbUrl);
            userAccessorLogger.info("Connected to db");
            app.listen(port, () => {
                userAccessorLogger.info(`User accessor server started on port - ${port}`);
            });
            break;
        } catch (error) {
            retries -= 1;
            if (!retries) {
                userAccessorLogger.fatal({ error: error }, "Critical failure during server startup and to connect to db");
                process.exit(1);
            }
            userAccessorLogger.error({ error: error }, `Failed to connect to db. Retries left: ${retries}`);
            await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retrying
        }
    }
};

connectToDatabase();
