const express = require("express")
const { userLogin, userRegister, changePassword, deleteUser, chagePreferences, chageCategoriesAndPreferences } = require("./userAccessorFunctions")
const userAccessorRouter = express.Router();

userAccessorRouter.post("/register", userRegister);
userAccessorRouter.post("/change-preferences", chagePreferences);
userAccessorRouter.post("/change-categories-and-preferences", chageCategoriesAndPreferences);
userAccessorRouter.put("/change-password", changePassword)
userAccessorRouter.delete("/delete-user", deleteUser)
module.exports = userAccessorRouter;