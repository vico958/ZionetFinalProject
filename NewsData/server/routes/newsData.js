const express = require("express");
const {getNews, getCategoriesRules} = require("./newsDataFunctions");

const newsDataRouter = express.Router();

newsDataRouter.get("/getNews", getNews);
newsDataRouter.get("/categoriesRules", getCategoriesRules);

module.exports = newsDataRouter;