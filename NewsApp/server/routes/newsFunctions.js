require("dotenv").config();
const { sendNewsToClient } = require("../services/general");
const DaprUserService = require("../services/user/userDaprService");
const UserValidator = require('./path/to/UserValidator');

async function userRegister(req, res) {
    try {
        const { userToRegister } = req.body;
        UserValidator.isRegisterUserValidIfNotThrowError(userToRegister);
        const returnedUser = await DaprUserService.registerUserUsingAccessor(userToRegister);
        const { email, fullName, preferences, categories } = returnedUser;
        const message = `${fullName}, you registered to the news app. We will send you the news via email.`;
        res.status(200).send(message);
        sendNewsToClient(categories, preferences, email, fullName);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
        console.log(error);
    }
}

async function userDelete(req, res) {
    try { // TODO: check if really need validation for req.body.user (i don't think need)
        const userToDelete = req.body.user;
        const answer = await DaprUserService.userDeleteHelper(userToDelete); // TODO: check if really delete or not
        const message = `You have been removed from the news app.`;
        res.status(200).send(message);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
        console.log(error);
    }
}

async function changeCategoriesAndPreferences(req, res) {
    try {
        const userWithNewSettings = req.body.userWithNewSettings;
        const { categories, preferences } = userWithNewSettings;
        UserValidator.isChangeCategoriesAndPreferencesValidIfNotThrowError(categories, preferences);
        const answer = await DaprUserService.changeCategoriesAndPreferencesHelper(userWithNewSettings); // TODO: TO TEST
        const message = `Your information has been updated.`;
        res.status(200).send(message);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
        console.log(error);
    }
}

async function changePreferences(req, res) {
    try {
        const userWithNewPreferences = req.body.userWithNewPreferences;
        UserValidator.isChangePreferencesValidIfNotThrowError(userWithNewPreferences.preferences);
        const answer = await DaprUserService.changePreferencesHelper(userWithNewPreferences); // TODO: TO TEST
        const message = `Your preferences have been updated.`;
        res.status(200).send(message);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
        console.log(error);
    }
}

async function changeEmail(req, res) {
    try {
        const userWithNewEmail = req.body.userWithNewEmail;
        UserValidator.isChangeEmailValidIfNotThrowError(userWithNewEmail.newEmail);
        const answer = await DaprUserService.changeEmailHelper(userWithNewEmail); // TODO: TO TEST
        const message = `Your email has been updated.`;
        res.status(200).send(message);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
        console.log(error);
    }
}

async function changePassword(req, res) {
    try {
        const userWithNewPassword = req.body.userWithNewPassword;
        UserValidator.isChangePasswordValidIfNotThrowError(userWithNewPassword.newPassword);//TODO: check this pattren
        const answer = await DaprUserService.changePasswordHelper(userWithNewPassword); // TODO: TO TEST
        const message = `Your password has been updated.`;
        res.status(200).send(message);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
        console.log(error);
    }
}

async function getNewsNow(req, res) {
    try {
        res.status(200).send("We received your request. If you are in the system, you will receive news shortly.");
        const user = req.body.user;
        const loginUser = await DaprUserService.login(user);
        const { categories, preferences, email, fullName } = loginUser;
        sendNewsToClient(categories, preferences, email, fullName);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
        console.log(error);
    }
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
