const express = require("express");
const {whichOneIsTheBestArticle} = require("./newsAiFunctions");
const newsAiRouter = express.Router();

newsAiRouter.post("/best-articles", whichOneIsTheBestArticle)

module.exports = newsAiRouter;