const {isListAndFromStringTypeAndNotEmpty, isEmailValid} = require("../general/generalValidation")

function isUserPasswordValid(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar) {
      return false
    }
    return true
  }

  function isUserFullNameValid(fullName) {
    const fullNameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
  
    if (!fullNameRegex.test(fullName)) {
      return false
    }
  
    return true
  }

function isUserEmailValid(email){
    return isEmailValid(email)
}

function isPreferencesValid(preferences){
    return isListAndFromStringTypeAndNotEmpty(preferences)
}

function isCategoriesValid(categories){
    return isListAndFromStringTypeAndNotEmpty(categories)

}

module.exports = {
    isPreferencesValid,
    isCategoriesValid,
    isUserPasswordValid,
    isUserFullNameValid,
    isUserEmailValid
  }