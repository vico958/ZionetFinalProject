const express = require("express")
const { userLogin, userRegister, changePassword, deleteUser, chageCategoriesAndPreferences, chagePreferences } = require("./userFunctions")
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.put("/change-categories-and-preferences", chageCategoriesAndPreferences);
userRouter.put("/change-preferences", chagePreferences);
userRouter.put("/change-password", changePassword)
userRouter.delete("/delete-user", deleteUser)
module.exports = userRouter;