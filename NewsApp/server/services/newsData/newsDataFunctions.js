require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const newsDaprHostAndServiceAppId = "newsdata"
const daprPort = "3500"; // Dapr Sidecar Port for user service
const newsDataClientDapr = new DaprClient({ newsDaprHostAndServiceAppId, daprPort });
const newsDataUrlMethodBeggining = "news-data"
const newsAppLogger = require("../logger/logger");

async function getNews(categories, preferences){
    try{
        newsAppLogger.info("Get news in newsDataFunctions event")
        const serviceMethod = `${newsDataUrlMethodBeggining}/get-news`;
        const news = await newsDataClientDapr.invoker.invoke(
            newsDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.POST,
            {categories, preferences} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        const reducedNews = news.results.map(item => ({
            title: item.title,
            link: item.link,
        }));
        newsAppLogger.info("Return fetched news")
        return reducedNews;
    }catch(error){
        newsAppLogger.fatal({
            error: error
        }, "Error occurred during getNews event");
        throw error;
    }
}

async function getCategoriesRules(){
    try{
        newsAppLogger.info("Get categories rules in newsDataFunctions event")
        const serviceMethod = `${newsDataUrlMethodBeggining}/categories-rules`;
        const categoriesRules = await newsDataClientDapr.invoker.invoke(
            newsDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.GET
        );
        newsAppLogger.info("Return categories rules news")
        return categoriesRules;
    }catch(error){
        newsAppLogger.fatal({
            error: error
        }, "Error occurred during getNews event");
        throw error;
    }
}


module.exports = {
    getNews,
    getCategoriesRules
}