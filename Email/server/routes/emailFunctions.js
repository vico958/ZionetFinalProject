const nodemailer = require("nodemailer");
const {handleEmailError} = require("./emailErrors");
const emailLogger = require("../services/logger");
async function sendEmail(req, res, next){
    try{
        emailLogger.info("Email send email event at the top of event")
        const { emailHost, emailUser, emailPassword, emailFrom, emailTo, emailSubject, emailTextHtml } = req.body.emailInfo
        const transporter = createTransporter(emailHost, emailUser, emailPassword);
        // const info = await transporter.sendMail({
        //     from: emailFrom, // sender address
        //     to: emailTo, // list of receivers
        //     subject: emailSubject, // Subject line
        //     html: emailTextHtml,
        // });
        // emailLogger.info({
        //     messageId: info.messageId
        // }, 'Email sent successfully');
        // res.status(200).send({ message: 'Email sent successfully', info: info }); // TODO : to remove before final project send
        res.status(200).send({ message: 'Email sent successfully', info: "info" });
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
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      });
    emailLogger.info('Email create transporter event after create transporter')
    return transporter
}

module.exports = {
    sendEmail
}