require("dotenv").config();
const newsDataLogger = require("../services/logger/logger");
const {createError} = require("../services/general/general");
const { categoriesAmountConst, categoriesListConst } =require("../services/general/const");
const apiKey = process.env.DATA_NEWS_IO_API_KEY
const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}`


async function hellowWorldCheck(req, res){
    newsDataLogger.info("Hello world from news data service")
    res.send("Hello world from news data service")
}

async function getNews(req, res, next) {
    const MAX_RETRIES = 4;
    let attempts = 1;
    while (attempts < MAX_RETRIES) {
        try {
            newsDataLogger.info("News data get news event at the top of event");
            const categories = req.body.categories;
            const preferences = req.body.preferences;
            const query = preferences.join(` OR `);
            let urlWithQuery = `${url}&category=${categories.toString()}&language=en&q=${query}`;
            let response = await fetch(urlWithQuery);
            let data = await response.json();

            if (checkReturnedData(response, data)) {
                returnResultForGetNews(res, data)
                newsDataLogger.info("News data get news event returned data");
                return // Exit the function if successful
            } else {
                newsDataLogger.info("News data get news event failed in first query, trying second one");
                urlWithQuery = `${url}&category=${categories.toString()}&language=en`;
                response = await fetch(urlWithQuery);
                data = await response.json();
                if (checkReturnedData(response, data)) {
                    returnResultForGetNews(res, data)
                    return // Exit the function if successful
                }
                throw createError(`Request failed with status ${response.status}`, response.status);
            }
        } catch (error) {
            newsDataLogger.info(`News data get news event attempt number ${attempts} failed`);
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

function checkReturnedData(response, data){
    return response.ok && data.results.length >= 1;
}

function returnResultForGetNews(res, data){
    res.status(200).send(data);
    newsDataLogger.info("News data get news event after sending back the news");
}

async function getCategoriesRules(req, res){
    newsDataLogger.info("News data get categories rules event at the top of event")
    const categoriesAmount = categoriesAmountConst;
    const categoriesList = categoriesListConst
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