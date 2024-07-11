const { isListAndFromStringTypeAndNotEmpty, isEmailValid } = require("../general/generalValidation");
const { createError } = require("../../general");

class UserValidator {
  static isUserPasswordValidIfNotThrowError(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);

    if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasDigit) {
      const errorMessage = "Password should contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.";
      throw createError(errorMessage, 400);
    }
  }

  static isUserFullNameValidIfNotThrowError(fullName) {
    const fullNameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;

    if (!fullNameRegex.test(fullName)) {
      const errorMessage = "Full name must be in English and include both a first name and a last name.";
      throw createError(errorMessage, 400);
    }
  }

  static isUserEmailValidIfNotThrowError(email) {
    if (!isEmailValid(email)) {
      const errorMessage = "Email address is not valid.";
      throw createError(errorMessage, 400);
    }
  }

  static isPreferencesValidIfNotThrowError(preferences) {
    if (!isListAndFromStringTypeAndNotEmpty(preferences)) {
      const errorMessage = "Preferences must be an array of strings.";
      throw createError(errorMessage, 400);
    }
  }

  static isCategoriesValidIfNotThrowError(categories) {
    if (!isListAndFromStringTypeAndNotEmpty(categories)) {
      const errorMessage = "Categories must be an array of strings.";
      throw createError(errorMessage, 400);
    }
  }

  static isRegisterUserValidIfNotThrowError(userToRegister) {
    const { email, password, fullName, preferences, categories } = userToRegister;
    try {
      UserValidator.isCategoriesValidIfNotThrowError(categories);
      UserValidator.isPreferencesValidIfNotThrowError(preferences);
      UserValidator.isUserEmailValidIfNotThrowError(email);
      UserValidator.isUserFullNameValidIfNotThrowError(fullName);
      UserValidator.isUserPasswordValidIfNotThrowError(password);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  static isChangeCategoriesAndPreferencesValidIfNotThrowError(categories, preferences) {
    try {
      UserValidator.isCategoriesValidIfNotThrowError(categories);
      UserValidator.isPreferencesValidIfNotThrowError(preferences);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  static isChangePreferencesValidIfNotThrowError(preferences) {
    try {
      UserValidator.isPreferencesValidIfNotThrowError(preferences);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  static isChangeEmailValidIfNotThrowError(email) {
    try {
      UserValidator.isUserEmailValidIfNotThrowError(email);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  static isChangePasswordValidIfNotThrowError(password) {
    try {
      UserValidator.isUserPasswordValidIfNotThrowError(password);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

module.exports = UserValidator;
