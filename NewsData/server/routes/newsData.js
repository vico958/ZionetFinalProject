const express = require("express");
const {getNews, getCategoriesRules, hellowWorldCheck} = require("./newsDataFunctions");

const newsDataRouter = express.Router();

newsDataRouter.post("/get-news", getNews);
newsDataRouter.get("/categories-rules", getCategoriesRules);
newsDataRouter.get("/", hellowWorldCheck);

module.exports = newsDataRouter;