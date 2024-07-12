require("dotenv").config();
const DaprUserService = require("../services/user/userDaprService");
const { sendNewsToClient } = require("../services/general");
const {
    isRegisterUserValidIfNotThrowError,
    isChangeCategoriesAndPreferencesValidIfNotThrowError,
    isChangePreferencesValidIfNotThrowError,
    isChangeEmailValidIfNotThrowError,
    isChangePasswordValidIfNotThrowError
} = require("../services/validation/userValidation/userValidation");



async function userRegister(req, res, next) {
    try {
        const { userToRegister } = req.body;
        isRegisterUserValidIfNotThrowError(userToRegister);
        const returnedUser = await DaprUserService.registerUserUsingAccessor(userToRegister);
        const { email, fullName, preferences, categories } = returnedUser.data;
        const messageToSend = `Hello ${fullName}, you registered to the news app. We will send you the news via email.`;
        returnResAnswerHelper(res, messageToSend, returnedUser.data)
        sendNewsToClient(categories, preferences, email, fullName);
    } catch (error) {
        console.error("user register, news app service error : ", error);
        next(error);
    }
}

async function userDelete(req, res, next) {
    try {
        const userToDelete = req.body.user;
        const answer = await DaprUserService.userDelete(userToDelete);
        const message = `You have been removed from the news app.`;
        returnResAnswerHelper(res, message, answer.data)
    } catch (error) {
        console.error("delete user, news app service error : ", error)
        next(error);
    }
}

async function changeCategoriesAndPreferences(req, res, next) {
    try {
        const userWithNewSettings = req.body.userWithNewSettings;
        const { newCategories, newPreferences } = userWithNewSettings;
        isChangeCategoriesAndPreferencesValidIfNotThrowError(newCategories, newPreferences);
        const answer = await DaprUserService.changeCategoriesAndPreferences(userWithNewSettings); // TODO: TO TEST
        returnResAnswerHelper(res, answer.message, answer.data)
    } catch (error) {
        console.error("Change categories and preferences, news app service error : ", error);
        next(error);
    }
}

async function changePreferences(req, res, next) {
    try {
        const userWithNewPreferences = req.body.userWithNewPreferences;
        isChangePreferencesValidIfNotThrowError(userWithNewPreferences.newPreferences);
        const answer = await DaprUserService.changePreferences(userWithNewPreferences); // TODO: TO TEST
        returnResAnswerHelper(res, answer.message, answer.data)
    } catch (error) {
        console.error("Change preferences, news app service error : ", error);
        next(error);
    }
}

async function changeEmail(req, res, next) {
    try {
        const userWithNewEmail = req.body.userWithNewEmail;
        isChangeEmailValidIfNotThrowError(userWithNewEmail.newEmail);
        const answer = await DaprUserService.changeEmail(userWithNewEmail); // TODO: TO TEST
        returnResAnswerHelper(res, answer.message, answer.data)
    } catch (error) {
        console.error("Change email, news app service error : ", error);
        next(error);
    }
}

async function changePassword(req, res, next) {
    try {
        const userWithNewPassword = req.body.userWithNewPassword;
        isChangePasswordValidIfNotThrowError(userWithNewPassword.newPassword);
        const answer = await DaprUserService.changePassword(userWithNewPassword); // TODO: TO TEST
        returnResAnswerHelper(res, answer.message, answer.data)
    } catch (error) {
        console.error("Change password, news app service error : ", error);
        next(error);
    }
}

async function getNewsNow(req, res, next) {
    try {
        res.status(200).send("We received your request. If you are in the system, you will receive news shortly.");
        const user = req.body.user;
        const loginUser = await DaprUserService.login(user);
        const { categories, preferences, email, fullName } = loginUser;
        sendNewsToClient(categories, preferences, email, fullName);
    } catch (error) {
        console.error("Get news now, news app service error : ", error);
        next(error);
    }
}

function returnResAnswerHelper(res, messageToSend, dataToSend){
    res.status(200).send(JSON.stringify({
        message: messageToSend,
        data: dataToSend
    }));
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
