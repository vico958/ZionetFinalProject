const express = require("express");
const {whichOneIsTheBestArticle, hellowWorldCheck} = require("./newsAiFunctions");
const newsAiRouter = express.Router();

newsAiRouter.post("/best-articles", whichOneIsTheBestArticle)
newsAiRouter.get("/", hellowWorldCheck)

module.exports = newsAiRouter;