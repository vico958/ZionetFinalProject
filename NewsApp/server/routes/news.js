const express = require("express");
const { userRegister, userDelete, chageCategoriesAndPreferences, chagePreferences} = require("./newsFunctions");

const newsRouter = express.Router();

newsRouter.post("/register", userRegister)
newsRouter.delete("/remove-user-from-receiving-news", userDelete)
newsRouter.put("/change-user-categories-and-preferences", chageCategoriesAndPreferences);
newsRouter.put("/change-user-preferences", chagePreferences);
module.exports = newsRouter;