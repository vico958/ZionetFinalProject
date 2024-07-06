async function getNews(req, res){
    try{
        res.status(200).send(JSON.stringify("test"))
    }catch(error){
        console.error("Error in getNews: ", error);
        res.status(500).json({error: 'Internal Server Error' })
    }
}

module.exports = {
    getNews,
}