require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { loggerMiddleware } = require("./server/middleware/loggerMiddleware");
const { errorHandler } = require("./server/middleware/errorHandler");
const mongoose = require('mongoose');
const dbUri = 'mongodb://mongoDb:27017/userDb';
const userAccessorLogger = require("./server/services/logger/logger");
const bodyParser = require("body-parser");
const userAccessor = require("./server/routes/userAccessor");
const app = express();
const port = process.env.port || "3003";

app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user-accessor", userAccessor);

app.get("/", (req, res) => {
    userAccessorLogger.info("Hello world from user accessor service");
    res.send("Hello world from user accessor service");
});

app.use(errorHandler);

const connectToDatabase = async (retries = 3) => {
    while (retries) {
        try {
            userAccessorLogger.info("Trying to connect to db and start server");
            await mongoose.connect(dbUri);
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
