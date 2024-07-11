const {isListAndFromStringTypeAndNotEmpty, isEmailValid} = require("../general/generalValidation")
const {createError} = require("../../general");

function isUserPasswordValidIfNotThrowError(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar) {
      const errorMessage = "Password should contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit."
      throw createError(errorMessage, 400);
  }
  }

  function isUserFullNameValidIfNotThrowError(fullName) {
    const fullNameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
  
    if (!fullNameRegex.test(fullName)) {
      const errorMessage = "Full name must be in English and include both a first name and a last name."
      throw createError(errorMessage, 400);
    }

  }

function isUserEmailValidIfNotThrowError(email){
    if(isEmailValid(email) === false){
      const errorMessage = "Email address is not valid."
      throw createError(errorMessage, 400);
    }
}

function isPreferencesValidIfNotThrowError(preferences){
    if(isListAndFromStringTypeAndNotEmpty(preferences) === false){
      const errorMessage = "Preferences must be an array of strings."
      throw createError(errorMessage, 400)
    }
}

function isCategoriesValidIfNotThrowError(categories){
    if(isListAndFromStringTypeAndNotEmpty(categories) === false){
      const errorMessage = "Categories must be an array of strings."
      throw createError(errorMessage, 400)
    }

}

function isRegisterUserValidIfNotThrowError(userToRegister){
  const {email, password, fullName, preferences, categories} = userToRegister
  try{
    isUserFullNameValidIfNotThrowError(email);
    isCategoriesValidIfNotThrowError(categories);
    isPreferencesValidIfNotThrowError(preferences);
    isUserEmailValidIfNotThrowError(email);
    isUserFullNameValidIfNotThrowError(fullName);
    isUserPasswordValidIfNotThrowError(password);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}

function isChangeCategoriesAndPreferencesIfNotThrowError(categories, preferences){
  try{
    isCategoriesValidIfNotThrowError(categories);
    isPreferencesValidIfNotThrowError(preferences);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}

function isChangePreferencesIfNotThrowError(preferences){
  try{
    isPreferencesValidIfNotThrowError(preferences);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}

function isChangeEmailIfNotThrowError(email){
  try{
    isUserEmailValidIfNotThrowError(email);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
module.exports = {
    isRegisterUserValidIfNotThrowError,
    isChangeCategoriesAndPreferencesIfNotThrowError,
    isChangePreferencesIfNotThrowError,
    isChangeEmailIfNotThrowError
  }