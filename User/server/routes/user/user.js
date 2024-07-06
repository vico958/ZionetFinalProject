const express = require("express")
const { userLogin, userRegister, changePassword } = require("./userFunctions")
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.put("/change-password", changePassword)
module.exports = userRouter;