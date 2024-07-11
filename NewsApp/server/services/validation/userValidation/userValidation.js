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
      throw new Error(errorMessage, 400);
  }
  }

  function isUserFullNameValidIfNotThrowError(fullName) {
    const fullNameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
  
    if (!fullNameRegex.test(fullName)) {
      return false
    }
  
    return true
  }

function isUserEmailValidIfNotThrowError(email){
    return isEmailValid(email)
}

function isPreferencesValidIfNotThrowError(preferences){
    return isListAndFromStringTypeAndNotEmpty(preferences)
}

function isCategoriesValidIfNotThrowError(categories){
    return isListAndFromStringTypeAndNotEmpty(categories)

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

module.exports = {
    isPreferencesValid,
    isCategoriesValid,
    isUserPasswordValid,
    isUserFullNameValid,
    isUserEmailValid,
    isRegisterUserValidIfNotThrowError
  }