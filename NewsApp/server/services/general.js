const { bestFitNewsWithAi, } = require("./newsAi/newsAiFunctions");
const {getNews} = require("./newsData/newsDataFunctions")
const {sendEmailWithNews} = require("./email/emailFunctions")
const { getAllUsersInSystem } = require("./user/userFunctions")
async function sendNewsToClient(categories, preferences, clientEmail, clientFullName){
    try{
        const news = await getNews(categories, preferences);
        const bestNews = await bestFitNewsWithAi(news, preferences);
        sendEmailWithNews(bestNews, clientEmail, clientFullName);
    }catch(error){
        console.log(error);
    }
}

async function sendDailyNews(){
    try{//TODO: a retry for the ones that fail
        const allUsers = await getAllUsersInSystem();
        for (const user of allUsers) {
            const {categories, preferences, email, fullName} = user
            await sendNewsToClient(categories, preferences, email, fullName)
        }
    }catch(error){
        console.log(error)
    }
}

function createError(message, statusCode){
    const error = Error(message);
    error.statusCode = statusCode;
    return error;
}

module.exports = {
    sendNewsToClient,
    sendDailyNews,
    createError
}