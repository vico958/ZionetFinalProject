const express = require("express")
const { userLogin, userRegister, changePassword } = require("./userFunctions")
const userRouter = express.Router();

userRouter.post("/register", userRegister);

module.exports = userRouter;