function jsonParseTextProperty(res){
    const responseBody = JSON.parse(res.text);
    return responseBody;
}

module.exports = {
    jsonParseTextProperty
};