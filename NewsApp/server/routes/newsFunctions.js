require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const userDaprHost = "user"; // Dapr Sidecar Host
const daprPort = "3500"; // Dapr Sidecar Port for user service
const useClientDapr = new DaprClient({ userDaprHost, daprPort });

const userUrlMethodBeggining = "user"

async function getNews(req, res){
    try{
        res.status(200).send(JSON.stringify("test"))
    }catch(error){
        console.error("Error in getNews: ", error);
        res.status(500).json({error: 'Internal Server Error' })
    }
}

async function userRegister(req, res){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/register`;
        const { userToRegister} = req.body;
        const returnedData = await useClientDapr.invoker.invoke(
            userDaprHost,
            serviceMethod,
            HttpMethod.POST,
            {userToRegister} ,
            { headers: { 'Content-Type': 'application/json' } },
          );
        const message = `${userRegister.fullName} you signed to the news app, we will send to you via email the news`
        res.status(200).send(message);
        res.end();
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    getNews,
    userRegister
}