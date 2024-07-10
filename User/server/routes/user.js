const express = require("express")
const { userRegister, changePassword, deleteUser, chageCategoriesAndPreferences,
     chagePreferences, changeEmail, userLogin } = require("./userFunctions")
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.put("/change-categories-and-preferences", chageCategoriesAndPreferences);
userRouter.put("/change-preferences", chagePreferences);
userRouter.put("/change-password", changePassword)
userRouter.put("/change-email", changeEmail)
userRouter.delete("/delete-user", deleteUser)
module.exports = userRouter;