const {isListAndFromStringTypeAndNotEmpty, isEmailValidAsEmail} = require("../general/generalValidation")
const {createError} = require("../../general/general");
const newsAppLogger = require("../../logger/logger");
function isUserPasswordValidIfNotThrowError(password) {
  newsAppLogger.info("Password validtion")
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasDigit) {
    newsAppLogger.error("Password validation fail");
      const errorMessage = "Password should contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit."
      throw createError(errorMessage, 400);
  }
  newsAppLogger.info("Passed password validtion")
}

  function isUserFullNameValidIfNotThrowError(fullName) {
  newsAppLogger.info("Full name validtion")

    const fullNameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
    
    if (!fullNameRegex.test(fullName)) {
    newsAppLogger.error("Full name validation fail");
      const errorMessage = "Full name must be in English and include both a first name and a last name."
      throw createError(errorMessage, 400);
    }
  newsAppLogger.info("Passed full name validtion")


  }

function isUserEmailValidIfNotThrowError(email){
  newsAppLogger.info("Email validtion");
    if(isEmailValidAsEmail(email) === false){
  newsAppLogger.error("Email address is not valid.");
      const errorMessage = "Email address is not valid."
      throw createError(errorMessage, 400);
    }
  newsAppLogger.info("Passed email validtion");

}

function isPreferencesValidIfNotThrowError(preferences){
  newsAppLogger.info("Preferences validtion");
    if(isListAndFromStringTypeAndNotEmpty(preferences) === false){
  newsAppLogger.error("Preferences must be an array of strings.");
      const errorMessage = "Preferences must be an array of strings."
      throw createError(errorMessage, 400)
    }
  newsAppLogger.info("Passed preferences validtion");

}

function isCategoriesValidIfNotThrowError(categories){
  newsAppLogger.info("Categories validtion");
    if(isListAndFromStringTypeAndNotEmpty(categories) === false){
  newsAppLogger.error("Categories must be an array of strings.");
      const errorMessage = "Categories must be an array of strings."
      throw createError(errorMessage, 400)
    }
    newsAppLogger.info("Passed categories validtion");
}

function isRegisterUserValidIfNotThrowError(userToRegister){
  const {email, password, fullName, preferences, categories} = userToRegister
  try{
  newsAppLogger.info("Register user validtion");
    isCategoriesValidIfNotThrowError(categories);
    isPreferencesValidIfNotThrowError(preferences);
    isUserEmailValidIfNotThrowError(email);
    isUserFullNameValidIfNotThrowError(fullName);
    isUserPasswordValidIfNotThrowError(password);
  newsAppLogger.info("Passed register user validtion");
  }catch(error){
    newsAppLogger.fatal(error);
    throw error;
  }
}

function isChangeCategoriesAndPreferencesValidIfNotThrowError(categories, preferences){
  try{
    isCategoriesValidIfNotThrowError(categories);
    isPreferencesValidIfNotThrowError(preferences);
  }catch(error){
    throw error;
  }
}

function isChangePreferencesValidIfNotThrowError(preferences){
  try{
    isPreferencesValidIfNotThrowError(preferences);
  }catch(error){
    throw error;
  }
}

function isChangeEmailValidIfNotThrowError(email){
  try{
    isUserEmailValidIfNotThrowError(email);
  }catch(error){
    throw error;
  }
}

function isChangePasswordValidIfNotThrowError(password){
  try{
    isUserPasswordValidIfNotThrowError(password);
  }catch(error){
    throw error;
  }
}
module.exports = {
    isRegisterUserValidIfNotThrowError,
    isChangeCategoriesAndPreferencesValidIfNotThrowError,
    isChangePreferencesValidIfNotThrowError,
    isChangeEmailValidIfNotThrowError,
    isChangePasswordValidIfNotThrowError
  }