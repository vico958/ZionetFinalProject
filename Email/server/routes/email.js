const express = require("express")
const { sendEmail, hellowWorldCheck } = require("./emailFunctions")
const emailRouter = express.Router();

emailRouter.post("/send-email", sendEmail);
emailRouter.get("/", hellowWorldCheck)
module.exports = emailRouter;