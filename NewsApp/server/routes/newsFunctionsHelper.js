require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const userDaprHost = "user"; // Dapr Sidecar Host
const daprPort = "3500"; // Dapr Sidecar Port for user service
const useClientDapr = new DaprClient({ userDaprHost, daprPort });
const userUrlMethodBeggining = "user"

async function registerUserUsingAccessor(userToRegister){
    try{

        const serviceMethod = `${userUrlMethodBeggining}/register`;
        const returnedUser = await useClientDapr.invoker.invoke(
            userDaprHost,
            serviceMethod,
            HttpMethod.POST,
            {userToRegister} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return returnedUser;
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

module.exports = {
    registerUserUsingAccessor,
    getNewsUsingEngine
}