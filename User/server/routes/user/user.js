const express = require("express")
const { userLogin, userRegister, changePassword, check } = require("./userFunctions")
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.put("/change-password", changePassword)
userRouter.get("/", check)
module.exports = userRouter;