const express = require("express");
const {getNews} = require("./newsFunctions");

const newsDataRouter = express.Router();

newsDataRouter.get("/getNews", getNews);

module.exports = newsDataRouter;