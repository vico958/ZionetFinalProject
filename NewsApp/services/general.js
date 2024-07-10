const { bestFitNewsWithAi, } = require("./newsAi/newsAiFunctions");
const {getNews} = require("./newsData/newsDataFunctions")
const {sendEmailWithNews} = require("./email/emailFunctions")

async function sendNewsForClient(categories, preferences, clientEmail, clientFullName){
    try{
        const news = await getNews(categories, preferences);
        const bestNews = await bestFitNewsWithAi(news, preferences); // TODO: need to do that
        sendEmailWithNews(bestNews, clientEmail, clientFullName);
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    sendNewsForClient
}