const nodemailer = require("nodemailer");

async function sendEmail(req, res){
    try{
        const { emailHost, emailUser, emailPassword, emailFrom, emailTo, emailSubject, emailText } = req.body.emailInfo
        const transporter = createTransporter(emailHost, emailUser, emailPassword);
        const info = await transporter.sendMail({
            from: emailFrom, // sender address
            to: emailTo, // list of receivers
            subject: emailSubject, // Subject line
            text: emailText, // plain text body
        });
        res.status(200).send("email sent")
    }catch(error){
        console.log(error);
    }
}

function createTransporter(emailHost, emailUser, emailPassword){
    const transporter = nodemailer.createTransport({
        host: emailHost,
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: emailUser,// zionetFinalProjectViktorDabush@outlook.com
          pass: emailPassword, // ViktorDabushZionetFinal
        },
      });
    return transporter
}

module.exports = {
    sendEmail
}