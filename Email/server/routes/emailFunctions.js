const nodemailer = require("nodemailer");
const {handleEmailError} = require("./emailErrors");

async function sendEmail(req, res, next){
    try{
        const { emailHost, emailUser, emailPassword, emailFrom, emailTo, emailSubject, emailText } = req.body.emailInfo
        const transporter = createTransporter(emailHost, emailUser, emailPassword);
        const info = await transporter.sendMail({
            from: emailFrom, // sender address
            to: emailTo, // list of receivers
            subject: emailSubject, // Subject line
            html: emailText,
        });
        console.log('Message sent: %s', info.messageId);
        res.status(200).send({ message: 'Email sent successfully', info: info });
    } catch (error) {
        const err = handleEmailError(error)
        next(err)
    }
}

function createTransporter(emailHost, emailUser, emailPassword){
    const transporter = nodemailer.createTransport({
        host: emailHost,
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      });
    return transporter
}

module.exports = {
    sendEmail
}