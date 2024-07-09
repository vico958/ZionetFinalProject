const express = require("express");
const {getNews, userRegister} = require("./newsFunctions");

const newsRouter = express.Router();

newsRouter.get("/get-news", getNews);
newsRouter.post("/register", userRegister)
module.exports = newsRouter;