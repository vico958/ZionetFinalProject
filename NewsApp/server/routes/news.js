const express = require("express");
const {getNews, userRegister, userDelete} = require("./newsFunctions");

const newsRouter = express.Router();

newsRouter.post("/register", userRegister)
newsRouter.delete("/delete-user", userDelete)
module.exports = newsRouter;