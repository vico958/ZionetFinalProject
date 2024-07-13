require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const newsAiDaprHostAndServiceAppId = "newsai"
const daprPort = "3500"; // Dapr Sidecar Port for user service
const newsAiClientDapr = new DaprClient({ newsAiDaprHostAndServiceAppId, daprPort });
const newsAiUrlMethodBeggining = "news-ai"

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