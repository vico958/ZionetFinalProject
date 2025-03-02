const express = require("express")
const { userRegister, changePassword, deleteUser, chagePreferences,
     chageCategoriesAndPreferences, changeEmail, userLogin, getAllUsers, hellowWorldCheck } = require("./userAccessorFunctions")
const userAccessorRouter = express.Router();

userAccessorRouter.post("/register", userRegister);
userAccessorRouter.post("/login", userLogin);
userAccessorRouter.get("/get-all-users", getAllUsers);
userAccessorRouter.get("/", hellowWorldCheck)
userAccessorRouter.put("/change-preferences", chagePreferences);
userAccessorRouter.put("/change-categories-and-preferences", chageCategoriesAndPreferences);
userAccessorRouter.put("/change-password", changePassword)
userAccessorRouter.put("/change-email", changeEmail)
userAccessorRouter.delete("/delete-user", deleteUser)

module.exports = userAccessorRouter;