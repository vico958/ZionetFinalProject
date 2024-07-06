const express = require("express");
const {getNews} = require("./newsFunctions");

const newsRouter = express.Router();

newsRouter.get("/getNews", getNews);

module.exports = newsRouter;