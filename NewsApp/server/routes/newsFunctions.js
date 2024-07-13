require("dotenv").config();
const DaprUserService = require("../services/user/userDaprService");
const { sendNewsToClient } = require("../services/general/general");
const {
    isRegisterUserValidIfNotThrowError,
    isChangeCategoriesAndPreferencesValidIfNotThrowError,
    isChangePreferencesValidIfNotThrowError,
    isChangeEmailValidIfNotThrowError,
    isChangePasswordValidIfNotThrowError
} = require("../services/validation/userValidation/userValidation");
const newsAppLogger = require("../services/logger/logger");


async function userRegister(req, res, next) {
    try {
        newsAppLogger.info("User register end point event in newsFunctions");
        const { userToRegister } = req.body;
        isRegisterUserValidIfNotThrowError(userToRegister);
        const returnedUser = await DaprUserService.registerUserUsingAccessor(userToRegister);
        const { email, fullName, preferences, categories } = returnedUser.data;
        const messageToSend = `Hello ${fullName}, you registered to the news app. We will send you the news via email.`;
        returnResAnswerHelper(res, messageToSend, returnedUser.data)
        sendNewsToClient(categories, preferences, email, fullName);
    } catch (error) {
        newsAppLogger.fatal({
            error: error
        }, "Error occurred during register event");
        next(error);
    }
}

async function userDelete(req, res, next) {
    try {
        newsAppLogger.info("User delete end point event in newsFunctions");
        const userToDelete = req.body.user;
        const answer = await DaprUserService.userDelete(userToDelete);
        const message = `You have been removed from the news app.`;
        returnResAnswerHelper(res, message, answer.data)
    } catch (error) {
        newsAppLogger.fatal({
            error: error
        }, "Error occurred during userDelete event");
        next(error);
    }
}

async function changeCategoriesAndPreferences(req, res, next) {
    try {
        newsAppLogger.info("Change categories and preferences end point event in newsFunctions");
        const userWithNewSettings = req.body.userWithNewSettings;
        const { newCategories, newPreferences } = userWithNewSettings;
        isChangeCategoriesAndPreferencesValidIfNotThrowError(newCategories, newPreferences);
        const answer = await DaprUserService.changeCategoriesAndPreferences(userWithNewSettings); // TODO: TO TEST
        returnResAnswerHelper(res, answer.message, answer.data)
    } catch (error) {
        newsAppLogger.fatal({
            error: error
        }, "Error occurred during changeCategoriesAndPreferences event");
        next(error);
    }
}

async function changePreferences(req, res, next) {
    try {
        newsAppLogger.info("Change preferences end point event in newsFunctions");
        const userWithNewPreferences = req.body.userWithNewPreferences;
        isChangePreferencesValidIfNotThrowError(userWithNewPreferences.newPreferences);
        const answer = await DaprUserService.changePreferences(userWithNewPreferences); // TODO: TO TEST
        returnResAnswerHelper(res, answer.message, answer.data)
    } catch (error) {
        newsAppLogger.fatal({
            error: error
        }, "Error occurred during changePreferences event");
        next(error);
    }
}

async function changeEmail(req, res, next) {
    try {
        newsAppLogger.info("Change email end point event in newsFunctions");
        const userWithNewEmail = req.body.userWithNewEmail;
        isChangeEmailValidIfNotThrowError(userWithNewEmail.newEmail);
        const answer = await DaprUserService.changeEmail(userWithNewEmail); // TODO: TO TEST
        returnResAnswerHelper(res, answer.message, answer.data)
    } catch (error) {
        newsAppLogger.fatal({
            error: error
        }, "Error occurred during changeEmail event");
        next(error);
    }
}

async function changePassword(req, res, next) {
    try {
        newsAppLogger.info("Change password end point event in newsFunctions")
        const userWithNewPassword = req.body.userWithNewPassword;
        isChangePasswordValidIfNotThrowError(userWithNewPassword.newPassword);
        const answer = await DaprUserService.changePassword(userWithNewPassword); // TODO: TO TEST
        returnResAnswerHelper(res, answer.message, answer.data)
    } catch (error) {
        newsAppLogger.fatal({
            error: error
        }, "Error occurred during changePassword event");
        next(error);
    }
}

async function getNewsNow(req, res, next) {
    try {
        newsAppLogger.info("Get news now end point event in newsFunctions")
        res.status(200).send("We received your request. If you are in the system, you will receive news shortly.");
        const user = req.body.user;
        const loginUser = await DaprUserService.login(user);
        const { categories, preferences, email, fullName } = loginUser;
        newsAppLogger.info("User is legit, start process of sending news");
        sendNewsToClient(categories, preferences, email, fullName);
    } catch (error) {
        newsAppLogger.fatal({
            error: error
        }, "Error occurred during getNewsNow event");
        next(error);
    }
}

function returnResAnswerHelper(res, messageToSend, dataToSend){
    res.status(200).send(JSON.stringify({
        message: messageToSend,
        data: dataToSend
    }));
    newsAppLogger.info(messageToSend)
}
module.exports = {
    userRegister,
    userDelete,
    changeCategoriesAndPreferences,
    changePreferences,
    changeEmail,
    changePassword,
    getNewsNow
};
