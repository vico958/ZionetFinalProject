const express = require("express")
const { userLogin, userRegister, changePassword, deleteUser } = require("./userAccessorFunctions")
const userAccessorRouter = express.Router();

userAccessorRouter.post("/register", userRegister);
userAccessorRouter.post("/login", userLogin);
userAccessorRouter.put("/change-password", changePassword)
userAccessorRouter.delete("delete-user", deleteUser)
module.exports = userAccessorRouter;