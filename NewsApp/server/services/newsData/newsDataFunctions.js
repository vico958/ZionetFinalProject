require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const newsDaprHostAndServiceAppId = "newsdata"
const daprPort = "3500"; // Dapr Sidecar Port for user service
const newsDataClientDapr = new DaprClient({ newsDaprHostAndServiceAppId, daprPort });
const newsDataUrlMethodBeggining = "news-data"

async function getNews(categories, preferences){
    try{
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
        console.log("newsssssss is ", news)
        console.log("reducedNewsreducedNews is ", reducedNews)
        return reducedNews;
    }catch(error){
        console.error(error);
    }
}

module.exports = {
    getNews,
}