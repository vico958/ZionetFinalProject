// require("dotenv").config()
const { registerUserUsingAccessor, getNewsUsingEngine } = require("./newsFunctionsHelper");
// const { DaprClient, HttpMethod } = require("@dapr/dapr");
// const userDaprHost = "user"; // Dapr Sidecar Host
// const daprPort = "3500"; // Dapr Sidecar Port for user service
// const useClientDapr = new DaprClient({ userDaprHost, daprPort });

// const userUrlMethodBeggining = "user"

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
        const { userToRegister} = req.body;
        const returnedUser = await registerUserUsingAccessor(userToRegister)
        const message = `${returnedUser.fullName} you signed to the news app, we will send to you via email the news`
        res.status(200).send(message);
        res.end();

        const news = await getNewsUsingEngine(returnedUser.categories).then(async (res) =>await res.json())
        console.log(news);

    }catch(error){
        console.log(error)
    }
}

module.exports = {
    getNews,
    userRegister
}