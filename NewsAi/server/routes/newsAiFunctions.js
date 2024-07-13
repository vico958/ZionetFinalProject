require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const newsAiLogger = require("../services/logger/logger");
const aiApiKey = process.env.AI_API_KEY
const genAI = new GoogleGenerativeAI(aiApiKey);


async function hellowWorldCheck(req, res){
    newsAiLogger.info("Hello world from news ai service");
    res.send("Hello world from news ai service");
}


async function whichOneIsTheBestArticle(req, res, next){
    try{
        newsAiLogger.info("News Ai which one is the best article event at the top of event")
        const preferences = req.body.preferences;
        const articles = req.body.articles;
        const response = await talkWithAi(articles, preferences);
        res.status(200).send(JSON.stringify(response));
        res.end();
        newsAiLogger.info("News Ai which one is the best article event after send answer")
    }catch(error){
        newsAiLogger.fatal({
            error: error,
        }, "Error occurred in which one is the best article event");
        next(error)
    }
}

async function talkWithAi(articlesInfo, preferences){
    try{
        newsAiLogger.info("News Ai talk with ai event at the top of event")
        // TODO: make ai to give me results only about my preferences
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" }});
        const prompt =`take this list, for each link in the list,
        please enter to that and make a summary of each article inside them.
    after that choose for me the best 3 articles that will fit this preferences`;
    const newPromt = `${prompt} ${preferences.toString()} and return to me this 3 and only this 3.
    when you return to me the 3 articles please return them with all the info.
    please add the summary you did for each one of them with a field name summary and dont start
    the summary with something like the article talk or summary is, just start the summary.
    in addition to that, if there is not enough articles to return because they dont talk about
    the preferences i told you,
    just return up to 3 that talk about this preferences, if its none of them its ok as well.
    i dont want to see an article about food with preferences for lets say pizza and that you
    return to me article that is about food but talk about ice cream`
    const result = await model.generateContent([newPromt, JSON.stringify(articlesInfo)])
    const response = result.response;
    const text = response.text();
    const jsonResponse = JSON.parse(text);
    newsAiLogger.info("News Ai talk with ai event, After of parsing answer of ai")
    return jsonResponse;
    }catch(error){
        newsAiLogger.fatal({
            error: error,
        }, "Error occurred in talk with ai event");
        throw error
    }
}
module.exports = {
    whichOneIsTheBestArticle,
    hellowWorldCheck
}