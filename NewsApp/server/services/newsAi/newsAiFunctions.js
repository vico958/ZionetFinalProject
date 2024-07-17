require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const newsAppLogger= require("../logger/logger");
const newsAiDaprHostAndServiceAppId = process.env.NEWS_AI_DAPR_HOST_AND_SERVICE_APP_ID;
const daprPort = process.env.DAPR_PORT;
const newsAiClientDapr = new DaprClient({ newsAiDaprHostAndServiceAppId, daprPort });
const newsAiUrlMethodBeggining = process.env.NEWS_AI_URL_METHOD_BEGGINING;
async function bestFitNewsWithAi(articles, preferences){
    try{
        newsAppLogger.info("Best fit news with ai in newsAiFunctions event")
        const serviceMethod = `${newsAiUrlMethodBeggining}/best-articles`;
        const result = await newsAiClientDapr.invoker.invoke(
            newsAiDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.POST,
            {articles, preferences} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        newsAppLogger.info("Return selected news by ai")
        return result;
    }catch(error){
        newsAppLogger.fatal({
            error: error
        }, "Error occurred during bestFitNewsWithAi event");
        throw error
    }
}

module.exports = {
    bestFitNewsWithAi,
}