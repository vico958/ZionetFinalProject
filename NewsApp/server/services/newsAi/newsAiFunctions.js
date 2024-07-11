require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const newsAiDaprHostAndServiceAppId = "newsai"
const daprPort = "3500"; // Dapr Sidecar Port for user service
const newsAiClientDapr = new DaprClient({ newsAiDaprHostAndServiceAppId, daprPort });
const newsAiUrlMethodBeggining = "news-ai"

async function bestFitNewsWithAi(articles, preferences){
    try{
        const serviceMethod = `${newsAiUrlMethodBeggining}/best-articles`;
        return await newsAiClientDapr.invoker.invoke(
            newsAiDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.POST,
            {articles, preferences} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
    }catch(error){
        console.error(error);
    }
}

module.exports = {
    bestFitNewsWithAi,
}