const express = require("express");
const { userRegister, userDelete, changeCategoriesAndPreferences, changePreferences,
    changeEmail, changePassword, getNewsNow, hellowWorldCheck} = require("./newsFunctions");

const newsRouter = express.Router();

newsRouter.post("/register", userRegister)
newsRouter.delete("/remove-user-from-receiving-news", userDelete)
newsRouter.put("/change-user-categories-and-preferences", changeCategoriesAndPreferences);
newsRouter.put("/change-user-preferences", changePreferences);
newsRouter.put("/change-user-email", changeEmail);
newsRouter.put("/change-password", changePassword)
newsRouter.post("/get-news-now", getNewsNow)
newsRouter.get("/", hellowWorldCheck)

module.exports = newsRouter;