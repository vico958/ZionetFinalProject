const express = require("express")
const { sendEmail } = require("./emailFunctions")
const emailRouter = express.Router();

emailRouter.post("/send-email", sendEmail);

module.exports = emailRouter;