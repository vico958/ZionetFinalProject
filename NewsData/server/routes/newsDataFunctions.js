require("dotenv").config();
const newsDataLogger = require("../services/logger/logger");
const {createError} = require("../services/general/general");
const apiKey = process.env.DATA_NEWS_IO_API_KEY
const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}`


async function hellowWorldCheck(req, res){
    newsDataLogger.info("Hello world from news data service")
    res.send("Hello world from news data service")
}

async function getNews(req, res, next) {
    const MAX_RETRIES = 3;
    let attempts = 0;

    // TODO: URGENTTTTTTTTTTTTTT
    // TODO: fix getting news with categories and inside with preferences
    while (attempts < MAX_RETRIES) {
        try {
            newsDataLogger.info("News data get news event at the top of event");
            const categories = req.body.categories;
            const preferences = req.body.preferences;
            const query = preferences.join(` OR `);
            const urlWithQuery = `${url}&category=${categories.toString()}&language=en&q=${query}`;
            const response = await fetch(urlWithQuery);
            const data = await response.json();

            if (response.ok) {
                res.status(200).send(data);
                newsDataLogger.info("News data get news event after sending back the news");
                return; // Exit the function if successful
            } else {
                throw createError(`Request failed with status ${response.status}`, response.status);
            }
        } catch (error) {
            attempts += 1;

            if (attempts >= MAX_RETRIES) {
                newsDataLogger.fatal({
                    error: error
                }, "Error occurred in News data service during get news event");
                next(error);
            }
        }
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