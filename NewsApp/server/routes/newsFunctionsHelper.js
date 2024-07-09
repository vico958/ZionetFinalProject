require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const userDaprHost = "user"; // Dapr Sidecar Host
const newsDataDaprHost = "newsdata"
const newsAiDaprHost = "newsai"
const daprPort = "3500"; // Dapr Sidecar Port for user service
const userClientDapr = new DaprClient({ userDaprHost, daprPort });
const newsDataClientDapr = new DaprClient({ newsDataDaprHost, daprPort });
const newsAiClientDapr = new DaprClient({ newsAiDaprHost, daprPort });
const userUrlMethodBeggining = "user"
const newsDataUrlMethodBeggining = "news-data"
const newsAiUrlMethodBeggining = "news-ai"

async function registerUserUsingAccessor(userToRegister){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/register`;
        return await userClientDapr.invoker.invoke(
            userDaprHost,
            serviceMethod,
            HttpMethod.POST,
            {userToRegister} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
    }catch(error){
        console.log(error);
    }
}

async function userDeleteHelper(userToDelete){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/delete-user`;
        const asnwer = await userClientDapr.invoker.invoke(
            userDaprHost,
            serviceMethod,
            HttpMethod.DELETE,
            {userToDelete} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return asnwer;
    }catch(error){
        console.log(error);
    }
}

async function getNews(categories){
    try{
        const serviceMethod = `${newsDataUrlMethodBeggining}/get-news`;
        const news = await newsDataClientDapr.invoker.invoke(
            newsDataDaprHost,
            serviceMethod,
            HttpMethod.POST,
            {categories} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        const reducedNews = news.results.map(item => ({
            title: item.title,
            link: item.link,
            creator: item.creator,
            description: item.description
        }));
        return reducedNews;
    }catch(error){
        console.log(error);
    }
}

async function bestFitNewsWithAi(articles, preferences){
    try{
        const serviceMethod = `${newsAiUrlMethodBeggining}/best-articles`;
        return await newsAiClientDapr.invoker.invoke(
            newsAiDaprHost,
            serviceMethod,
            HttpMethod.POST,
            {articles, preferences} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
    }catch(error){
        console.log(error);
    }
}

async function chageCategoriesAndPreferencesHelper(userWithNewSettings){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/change-categories-and-preferences`;
        const asnwer = await userClientDapr.invoker.invoke(
            userDaprHost,
            serviceMethod,
            HttpMethod.PUT,
            {userWithNewSettings} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return asnwer;
    }catch(error){
        console.log(error);
    }
}

async function chagePreferencesHelper(userWithNewPreferences){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/change-preferences`;
        const asnwer = await userClientDapr.invoker.invoke(
            userDaprHost,
            serviceMethod,
            HttpMethod.PUT,
            {userWithNewPreferences} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return asnwer;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    registerUserUsingAccessor,
    getNews,
    bestFitNewsWithAi,
    userDeleteHelper,
    chageCategoriesAndPreferencesHelper,
    chagePreferencesHelper
}