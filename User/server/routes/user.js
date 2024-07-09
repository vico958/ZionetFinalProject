const express = require("express")
const { userLogin, userRegister, changePassword, deleteUser } = require("./userFunctions")
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.put("/change-password", changePassword)
user.Router.delete("/delete-user", deleteUser)
module.exports = userRouter;