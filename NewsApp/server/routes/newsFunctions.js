const { registerUserUsingAccessor, getNews, bestFitNewsWithAi, userDeleteHelper, chageCategoriesAndPreferencesHelper, chagePreferencesHelper } = require("./newsFunctionsHelper");

async function userRegister(req, res){
    try{
        const { userToRegister} = req.body;
        const returnedUser = await registerUserUsingAccessor(userToRegister)
        const {categories, preferences, fullName } = returnedUser;
        const message = `${fullName} you signed to the news app, we will send to you via email the news`
        res.status(200).send(message);
        res.end();

        const news = await getNews(categories)
        // const bestNews = await bestFitNewsWithAi(news, preferences) // TODO: need to do that
        // console.log(bestNews);

    }catch(error){
        console.log(error)
    }
}

async function userDelete(req, res){
    try{
        const userToDelete = req.body.user;
        const answer = await userDeleteHelper(userToDelete)//TODO: check if really delete or not
        const message = `you been remove from news app`
        res.status(200).send(message);
        res.end();
    }catch(error){
        console.log(error);
    }
}

async function chageCategoriesAndPreferences(req, res){
    try{
        const userWithNewSettings = req.body.userWithNewSettings;
        const answer = await chageCategoriesAndPreferencesHelper(userWithNewSettings)//TODO:TO TEST
        const message = `you'r info has been change`
        res.status(200).send(message);
        res.end();
    }catch(error){
        console.log(error);
    }
}

async function chagePreferences(req, res){
    try{
        const userWithNewPreferences = req.body.userWithNewPreferences;
        const answer = await chagePreferencesHelper(userWithNewPreferences)//TODO:TO TEST
        const message = `you'r info has been change`
        res.status(200).send(message);
        res.end();
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    userRegister,
    userDelete,
    chageCategoriesAndPreferences,
    chagePreferences
}