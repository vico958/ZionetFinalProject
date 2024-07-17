const nodemailer = require("nodemailer");
const {handleEmailError} = require("./emailErrors");
const emailLogger = require("../services/logger/logger");

async function hellowWorldCheck(req, res){
    emailLogger.info("hello world from email service");
    res.send("hello world from email service");
}


async function sendEmail(req, res, next){
    try{
        emailLogger.info("Email send email event at the top of event")
        const { emailHost, emailUser, emailPassword, emailFrom, emailTo, emailSubject, emailTextHtml } = req.body.emailInfo
        const transporter = createTransporter(emailHost, emailUser, emailPassword);
        const info = await transporter.sendMail({
            from: emailFrom,
            to: emailTo,
            subject: emailSubject,
            html: emailTextHtml,
        });
        emailLogger.info({
            messageId: info.messageId
        }, 'Email sent successfully');
        res.status(200).send({ message: 'Email sent successfully', info: info });
        emailLogger.info('Email sent successfully')
    } catch (error) {
        const err = handleEmailError(error)
        emailLogger.fatal({
            error: error
        }, "Error occurred in Email service during send email event");
        next(err)
    }
}

function createTransporter(emailHost, emailUser, emailPassword){
    emailLogger.info('Email create transporter event before create transporter')
    const transporter = nodemailer.createTransport({
        host: emailHost,
        port: 465,
        secure: true,
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      });
    emailLogger.info('Email create transporter event after create transporter')
    return transporter
}

module.exports = {
    sendEmail,
    hellowWorldCheck
}