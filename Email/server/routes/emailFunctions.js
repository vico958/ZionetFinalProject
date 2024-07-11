const nodemailer = require("nodemailer");

async function sendEmail(req, res){
    try{
        const { emailHost, emailUser, emailPassword, emailFrom, emailTo, emailSubject, emailText } = req.body.emailInfo
        const transporter = createTransporter(emailHost, emailUser, emailPassword);
        const info = await transporter.sendMail({
            from: emailFrom, // sender address
            to: emailTo, // list of receivers
            subject: emailSubject, // Subject line
            html: emailText, // Use 'html' instead of 'text'
        });
        console.log('Message sent: %s', info.messageId);
        res.status(200).send({ message: 'Email sent successfully', info: info });
    } catch (error) {
        const err = handleEmailError(error)
        res.status(err.statusCode).send(err.message);
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