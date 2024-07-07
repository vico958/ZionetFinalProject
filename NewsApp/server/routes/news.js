const express = require("express");
const {getNews, userRegister} = require("./newsFunctions");

const newsRouter = express.Router();

newsRouter.get("/getNews", getNews);
newsRouter.post("/register", userRegister)
module.exports = newsRouter;