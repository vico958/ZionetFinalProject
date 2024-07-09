const express = require("express")
const { userRegister, changePassword, deleteUser, chagePreferences, chageCategoriesAndPreferences } = require("./userAccessorFunctions")
const userAccessorRouter = express.Router();

userAccessorRouter.post("/register", userRegister);
userAccessorRouter.put("/change-preferences", chagePreferences);
userAccessorRouter.put("/change-categories-and-preferences", chageCategoriesAndPreferences);
userAccessorRouter.put("/change-password", changePassword)
userAccessorRouter.delete("/delete-user", deleteUser)
module.exports = userAccessorRouter;