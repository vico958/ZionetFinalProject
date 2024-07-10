require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const emailDaprHostAndServiceAppId = "email"
const daprPort = "3500"; // Dapr Sidecar Port for user service
const emailClientDapr = new DaprClient({ emailDaprHostAndServiceAppId, daprPort });
const emailUrlMethodBeggining = "email"

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
    sendMessage
}