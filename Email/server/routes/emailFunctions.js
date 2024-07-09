const nodemailer = require("nodemailer");

async function sendEmail(req, res){
    try{
        const { emailHost, user, pass, from, to, subject, text } = req.body.emailInfo
        const transporter = createTransporter(emailHost, user, pass);
        const info = await transporter.sendMail({
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
        });
        res.status(200).send("email sent")
    }catch(error){
        console.log(error);
    }
}

function createTransporter(emailHost, user, pass){
    const transporter = nodemailer.createTransport({
        host: emailHost,
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: user,// zionetFinalProjectViktorDabush@outlook.com
          pass: pass, // ViktorDabushZionetFinal
        },
      });
    return transporter
}

module.exports = {
    sendEmail
}