require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const userDaprHostAndServiceAppId = "user"; // Dapr Sidecar Host
const newsDaprHostAndServiceAppId = "newsdata"
const newsAiDaprHostAndServiceAppId = "newsai"
const emailDaprHostAndServiceAppId = "email"
const daprPort = "3500"; // Dapr Sidecar Port for user service
const userClientDapr = new DaprClient({ userDaprHostAndServiceAppId, daprPort });
const newsDataClientDapr = new DaprClient({ newsDaprHostAndServiceAppId, daprPort });
const newsAiClientDapr = new DaprClient({ newsAiDaprHostAndServiceAppId, daprPort });
const emailClientDapr = new DaprClient({ emailDaprHostAndServiceAppId, daprPort });
const userUrlMethodBeggining = "user"
const newsDataUrlMethodBeggining = "news-data"
const newsAiUrlMethodBeggining = "news-ai"
const emailUrlMethodBeggining = "email"

async function registerUserUsingAccessor(userToRegister){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/register`;
        return await userClientDapr.invoker.invoke(
            userDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.POST,
            {userToRegister} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
    }catch(error){
        console.log(error);
    }
}

async function userDeleteHelper(userToDelete){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/delete-user`;
        const asnwer = await userClientDapr.invoker.invoke(
            userDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.DELETE,
            {userToDelete} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return asnwer;
    }catch(error){
        console.log(error);
    }
}

async function getNews(categories, preferences){
    try{
        const serviceMethod = `${newsDataUrlMethodBeggining}/get-news`;
        const news = await newsDataClientDapr.invoker.invoke(
            newsDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.POST,
            {categories, preferences} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        const reducedNews = news.results.map(item => ({
            title: item.title,
            link: item.link,
        }));
        return reducedNews;
    }catch(error){
        console.log(error);
    }
}

async function bestFitNewsWithAi(articles, preferences){
    try{
        const serviceMethod = `${newsAiUrlMethodBeggining}/best-articles`;
        return await newsAiClientDapr.invoker.invoke(
            newsAiDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.POST,
            {articles, preferences} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
    }catch(error){
        console.log(error);
    }
}

async function changeCategoriesAndPreferencesHelper(userWithNewSettings){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/change-categories-and-preferences`;
        const asnwer = await userClientDapr.invoker.invoke(
            userDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.PUT,
            {userWithNewSettings} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return asnwer;
    }catch(error){
        console.log(error);
    }
}

async function changePreferencesHelper(userWithNewPreferences){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/change-preferences`;
        const asnwer = await userClientDapr.invoker.invoke(
            userDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.PUT,
            {userWithNewPreferences} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return asnwer;
    }catch(error){
        console.log(error);
    }
}

async function changeEmailHelper(userWithNewEmail){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/change-email`;
        const asnwer = await userClientDapr.invoker.invoke(
            userDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.PUT,
            {userWithNewEmail} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return asnwer;
    }catch(error){
        console.log(error);
    }
}

async function changePasswordHelper(userWithNewPassword){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/change-password`;
        const asnwer = await userClientDapr.invoker.invoke(
            userDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.PUT,
            {userWithNewPassword} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return asnwer;
    }catch(error){
        console.log(error);
    }
}

async function sendMessage(newsData, userEmail, clientName, subject, text){
    
const emailHost = process.env.EMAIL_HOST;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
const emailFrom = process.env.EMAIL_FROM;
const emailTo = userEmail;

const formattedNewsData = newsData.map((item) => {
    return `<p><strong style="color: black;">${item.title}</strong></p>
            <p style="color: black;">${item.summary}</p>
            <p><a href="${item.link}">Read full article</a></p>`;
  }).join('<br>');
  
  const emailSubject = "Your interesting news is ready!!!" //|| subject
  const emailText = `<p style="color: black;">Hello ${clientName},</p>
  <p style="color: black;">This is the news app you signed up for. Here is your news:</p>
  ${formattedNewsData}
  <p style="color: black;">We hope you like it. In 24 hours, you'll get a new update. Until then, have a nice day!</p>`; //|| text;
  
  const emailInfo = {
    emailHost, emailUser, emailPassword, emailFrom, emailTo, emailSubject, emailText
  };
try{
    const serviceMethod = `${emailUrlMethodBeggining}/send-email`;
    return await emailClientDapr.invoker.invoke(
        emailDaprHostAndServiceAppId,
        serviceMethod,
        HttpMethod.POST,
        {emailInfo} ,
        { headers: { 'Content-Type': 'application/json' } },
    );
}catch(error){
    console.log(error);
}

}

module.exports = {
    registerUserUsingAccessor,
    getNews,
    bestFitNewsWithAi,
    userDeleteHelper,
    changeCategoriesAndPreferencesHelper,
    changePreferencesHelper,
    changeEmailHelper,
    changePasswordHelper,
    sendMessage
}