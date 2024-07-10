const express = require("express")
const { userRegister, changePassword, deleteUser, chageCategoriesAndPreferences,
     chagePreferences, changeEmail, userLogin, getAllUsers } = require("./userFunctions")
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/get-all-users", getAllUsers);
userRouter.put("/change-categories-and-preferences", chageCategoriesAndPreferences);
userRouter.put("/change-preferences", chagePreferences);
userRouter.put("/change-password", changePassword)
userRouter.put("/change-email", changeEmail)
userRouter.delete("/delete-user", deleteUser)
module.exports = userRouter;