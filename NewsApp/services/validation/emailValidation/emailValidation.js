const {isStringType} = require("../general/generalValidation")

function isSendEmailInfoValid(emailHost, emailUser, emailPassword, emailFrom, emailTo, emailSubject, emailText){
  if(isStringType(emailHost) === false || isEmailValidAsEmail(emailHost) === false) return false;
  if(isStringType(emailUser) === false || isEmailValidAsEmail(emailUser) === false) return false;
  if(isStringType(emailPassword) === false) return false;
  if(isStringType(emailFrom) === false || isEmailValidAsEmail(emailFrom) === false) return false;
  if(isStringType(emailTo) === false || isEmailValidAsEmail(emailTo) === false) return false;
  if(isStringType(emailSubject) === false) return false;
  if(isStringType(emailText) === false) return false;
  return true;
}

function isEmailValidAsEmail(emailToCheck){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailToCheck);
}


module.exports = {
  isSendEmailInfoValid
}