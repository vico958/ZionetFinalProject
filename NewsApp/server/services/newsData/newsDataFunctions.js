require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const newsAppLogger = require("../logger/logger");
const newsDaprHostAndServiceAppId = process.env.NEWS_DAPR_HOST_AND_SERVICE_APP_ID;
const daprPort = process.env.DAPR_PORT;
const newsDataClientDapr = new DaprClient({ newsDaprHostAndServiceAppId, daprPort });
const newsDataUrlMethodBeggining = process.env.NEWS_DATA_URL_METHOD_BEGGINING;

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