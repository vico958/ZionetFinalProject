require("dotenv").config();
const apiKey = process.env.DATA_NEWS_IO_API_KEY
const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}`

async function getNews(req, res){
    const categories = req.body.categories;
    const urlWithQuery = `${url}&category=${categories.toString()}$language=en`
    const data = await fetch(urlWithQuery).then(async (res)=> res.json());
    console.log(data);
    res.status(200).send(data);
    res.end();
}

async function getCategoriesRules(req, res){
    const categoriesAmount = 5;
    const categoriesList = ["business",
        "crime",
        "domestic",
        "education",
        "entertainment",
        "environment",
        "food",
        "health",
        "lifestyle",
        "other",
        "politics",
        "science",
        "sports",
        "technology",
        "top",
        "tourism",
        "world"];
        const responsePayload = {
            categoriesAmount: categoriesAmount,
            categoriesList: categoriesList
        };
    res.status(200).send(responsePayload)
}


module.exports = {
    getNews,
    getCategoriesRules
}