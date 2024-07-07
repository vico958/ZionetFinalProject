const express = require("express")
const { userLogin, userRegister, changePassword, check } = require("./userAccessorFunctions")
const userAccessorRouter = express.Router();

userAccessorRouter.post("/register", userRegister);
userAccessorRouter.post("/login", userLogin);
userAccessorRouter.put("/change-password", changePassword)
userAccessorRouter.get("/", check)
module.exports = userAccessorRouter;