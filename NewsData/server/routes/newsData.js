const express = require("express");
const {getNews, getCategoriesRules} = require("./newsDataFunctions");

const newsDataRouter = express.Router();

newsDataRouter.post("/get-news", getNews);
newsDataRouter.get("/categories-rules", getCategoriesRules);

module.exports = newsDataRouter;