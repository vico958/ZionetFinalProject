const { registerUserUsingAccessor, getNewsUsingEngine, bestFitNewsWithAi } = require("./newsFunctionsHelper");

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
        const {categories, preferences, fullName } = returnedUser;
        const message = `${fullName} you signed to the news app, we will send to you via email the news`
        res.status(200).send(message);
        res.end();

        const news = await getNewsUsingEngine(categories).then(async (res) =>await res.json())
        const bestNews = await bestFitNewsWithAi(news, preferences) // TODO: need to do that

    }catch(error){
        console.log(error)
    }
}

module.exports = {
    getNews,
    userRegister
}