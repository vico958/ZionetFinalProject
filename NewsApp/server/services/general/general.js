const { bestFitNewsWithAi, } = require("../newsAi/newsAiFunctions");
const {getNews} = require("../newsData/newsDataFunctions")
const {sendEmailWithNews} = require("../email/emailFunctions")
const DaprUserService = require("../user/userDaprService");
const newsAppLogger = require("../logger/logger");

async function sendNewsToClient(categories, preferences, clientEmail, clientFullName){
    try{
        newsAppLogger.info("Send news to client event")
        const news = await getNews(categories, preferences);
        const bestNews = await bestFitNewsWithAi(news, preferences);
        sendEmailWithNews(bestNews, clientEmail, clientFullName);
    }catch(error){
        newsAppLogger.fatal({
            error: error
        }, "Error occurred during sendNewsToClient event");
        throw error
    }
}

async function sendDailyNews(){
    try{
        newsAppLogger.info("Send daily news event")
        const allUsers = await DaprUserService.getAllUsersInSystem();
        for (const user of allUsers.data) {
            const {categories, preferences, email, fullName} = user
            await sendNewsToClient(categories, preferences, email, fullName)
        }
    }catch(error){
        newsAppLogger.fatal({
            error: error
        }, "Error occurred during sendDailyNews event");
    }
}

function createError(message, statusCode){
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

module.exports = {
    sendNewsToClient,
    sendDailyNews,
    createError
}