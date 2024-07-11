require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const emailDaprHostAndServiceAppId = "email"
const daprPort = "3500"; // Dapr Sidecar Port for user service
const emailClientDapr = new DaprClient({ emailDaprHostAndServiceAppId, daprPort });
const emailUrlMethodBeggining = "email"
const emailHost = process.env.EMAIL_HOST;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
const emailFrom = process.env.EMAIL_FROM;

async function sendEmailWithNews(newsData, clientEmail, clientName){
    const emailTo = clientEmail;
    const { emailSubject, emailText} = createEmailNewsContent(newsData, clientName);  
    const emailInfo = {
      emailHost, emailUser, emailPassword, emailFrom, emailTo, emailSubject, emailText
    };
    await sendEmail(emailInfo);
}

async function sendEmail(emailInfo){
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
        console.error(error.message);
        throw error
    }
}

function createEmailNewsContent(newsData, clientName){
    const newsDataForEmailContent = formattedNewsData(newsData);
    const emailSubject = "Your interesting news is ready!!!"
    const emailText = `<p style="color: black;">Hello ${clientName},</p>
  <p style="color: black;">This is the news app you signed up for. Here is your news:</p>
  ${newsDataForEmailContent}
  <p style="color: black;">We hope you like it. In 24 hours, you'll get a new update. Until then, have a nice day!</p>`; //|| text;

  return {
    emailSubject,
    emailText
  };
}

function formattedNewsData(news){
    return news.map((item) => {
        return `<p><strong style="color: black;">${item.title}</strong></p>
                <p style="color: black;">${item.summary}</p>
                <p><a href="${item.link}">Read full article</a></p>`;
      }).join('<br>');
}

module.exports = {
    sendEmailWithNews
}