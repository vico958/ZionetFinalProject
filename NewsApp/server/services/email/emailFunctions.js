require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const newsAppLogger = require("../logger/logger");
const emailDaprHostAndServiceAppId = process.env.EMAIL_DAPR_HOST_AND_SERVICE_APP_ID;
const daprPort = process.env.DAPR_PORT;
const emailClientDapr = new DaprClient({ emailDaprHostAndServiceAppId, daprPort });
const emailUrlMethodBeggining = process.env.EMAIL_URL_METHOD_BEGGINING;
const emailHost = process.env.EMAIL_HOST;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
const emailFrom = process.env.EMAIL_FROM;

async function sendEmailWithNews(newsData, clientEmail, clientName){
    try{

        newsAppLogger.info("Send email with news in emailFunctions event")
        const emailTo = clientEmail;
        const { emailSubject, emailTextHtml} = createEmailNewsContent(newsData, clientName);  
        const emailInfo = {
            emailHost, emailUser, emailPassword, emailFrom, emailTo, emailSubject, emailTextHtml
        };
        // await sendEmail(emailInfo); // TODO : to remove before send to check my final project
        newsAppLogger.info({emailInfo:emailInfo},"send email but right now i will just log it");// TODO : remove as well
        newsAppLogger.info("Email sent");
    }catch(error){
        newsAppLogger.fatal({
            error: error
        }, "Error occurred during sendEmailWithNews event");
        throw error
    }
}

async function sendEmail(emailInfo){
    try{
        newsAppLogger.info("Send email in emailFunctions event");
        const serviceMethod = `${emailUrlMethodBeggining}/send-email`;
        return await emailClientDapr.invoker.invoke(
            emailDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.POST,
            {emailInfo} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
    }catch(error){
        throw error
    }
}

function createEmailNewsContent(newsData, clientName){
    newsAppLogger.info("Create email news content in emailFunctions event");

    const newsDataForEmailContent = formattedNewsData(newsData);
    const emailSubject = "Your interesting news is ready!!!"
    const emailTextHtml = `<p style="color: black;">Hello ${clientName},</p>
  <p style="color: black;">This is the news app you signed up for. Here is your news:</p>
  ${newsDataForEmailContent}
  <p style="color: black;">We hope you like it. In 24 hours, you'll get a new update. Until then, have a nice day!</p>`; //|| text;

  return {
    emailSubject,
    emailTextHtml
  };
}

function formattedNewsData(news){
    newsAppLogger.info("Formatted news data in emailFunctions event")

    return news.map((item) => {
        return `<p><strong style="color: black;">${item.title}</strong></p>
                <p style="color: black;">${item.summary}</p>
                <p><a href="${item.link}">Read full article</a></p>`;
      }).join('<br>');
}

module.exports = {
    sendEmailWithNews
}