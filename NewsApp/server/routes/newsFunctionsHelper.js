require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const userDaprHost = "user"; // Dapr Sidecar Host
const daprPort = "3500"; // Dapr Sidecar Port for user service
const useClientDapr = new DaprClient({ userDaprHost, daprPort });
const userUrlMethodBeggining = "user"

async function registerUserUsingAccessor(userToRegister){
    try{

        const serviceMethod = `${userUrlMethodBeggining}/register`;
        return await useClientDapr.invoker.invoke(
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
        const asnwer = await useClientDapr.invoker.invoke(
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

async function getNewsUsingEngine(categories){
    const news = await fetch("http://localhost:3004/news-data/getNews",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
        categories:[categories]
  }),
    })
    return news;
}

async function bestFitNewsWithAi(news, preferences){
    //TODO: talk with ai
}

async function chageCategoriesAndPreferencesHelper(userWithNewSettings){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/change-categories-and-preferences`;
        const asnwer = await useClientDapr.invoker.invoke(
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
        const asnwer = await useClientDapr.invoker.invoke(
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
    getNewsUsingEngine,
    bestFitNewsWithAi,
    userDeleteHelper,
    chageCategoriesAndPreferencesHelper,
    chagePreferencesHelper
}