require("dotenv").config();
const newsDataLogger = require("../services/logger/logger");
const apiKey = process.env.DATA_NEWS_IO_API_KEY
const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}`


async function hellowWorldCheck(req, res){
    newsDataLogger.info("Hello world from news data service")
    res.send("Hello world from news data service")
}

async function getNews(req, res, next){
    // TODO: URGENTTTTTTTTTTTTTT
    // TODO : fix getting news with categories and inside with preferences
    try{
        newsDataLogger.info("News data get news event at the top of event")
        const categories = req.body.categories;
        const preferences = req.body.preferences;
        const query = preferences.join(` OR `)
        const urlWithQuery = `${url}&category=${categories.toString()}&language=en&q=${query}`
        const data = await fetch(urlWithQuery).then(async (res)=> res.json());
        res.status(200).send(data);
        newsDataLogger.info("News data get news event after sending back the news")
    }catch(error){
        newsDataLogger.fatal({
            error: error
        }, "Error occurred in News data service during get news event");
        next(error);
    }
}

async function getCategoriesRules(req, res){
    newsDataLogger.info("News data get categories rules event at the top of event")
    const categoriesAmount = 5;
    const categoriesList = ["business",
        "crime",
        "domestic",
        "education",
        "entertainment",
        "environment",
        "food",
        "health",
        "lifestyle",
        "other",
        "politics",
        "science",
        "sports",
        "technology",
        "top",
        "tourism",
        "world"];
        const responsePayload = {
            categoriesAmount: categoriesAmount,
            categoriesList: categoriesList
        };
    res.status(200).send(JSON.stringify(responsePayload));
    newsDataLogger.info("News data get categories rules event after sending results");
}


module.exports = {
    getNews,
    getCategoriesRules,
    hellowWorldCheck
}