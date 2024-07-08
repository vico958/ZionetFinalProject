require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const aiApiKey = process.env.AI_API_KEY
const genAI = new GoogleGenerativeAI(aiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" }});

async function whichOneIsTheBestArticle(req, res){
    try{
        const preferences = req.body.preferences;
        const articlesInfo = req.body.articlesInfo;
        //articlesInfo :{
    //         article_id: article.article_id,
    //         title: article.title,
    //     description: article.description,
    //     link:article.link,
    // }
        const response = talkWithAi(articlesInfo, preferences);
        res.status(200).send(JSON.stringify(response));
        res.end();
    }catch(error){
        console.log(error);
    }
}

async function talkWithAi(articlesInfo, preferences){
    const prompt ="take this link list make a summry of each article inside them and choose me the best 3 that will fit this preferences";
    const newPromt = `${prompt} ${preferences.toString()}`
    const result = await model.generateContent([newPromt, JSON.stringify(articlesInfo)])
    const response = await result.response;
    const text = response.text();
    const jsonResponse = JSON.parse(text);
    return jsonResponse;
}
module.exports = {
    whichOneIsTheBestArticle
}