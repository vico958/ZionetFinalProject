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



async function userRegister(req, res) {
    try {
        const { userToRegister } = req.body;
        isRegisterUserValidIfNotThrowError(userToRegister);
        const returnedUser = await DaprUserService.registerUserUsingAccessor(userToRegister);
        const { email, fullName, preferences, categories } = returnedUser;
        const message = `Hello ${fullName}, you registered to the news app. We will send you the news via email.`;
        res.status(200).send(message);
        sendNewsToClient(categories, preferences, email, fullName);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
        console.log("user register, news app service error : ", error)
    }
}

async function userDelete(req, res) {
    try {
        const userToDelete = req.body.user;
        await DaprUserService.userDelete(userToDelete);
        const message = `You have been removed from the news app.`;
        res.status(200).send(message);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
        console.log("delete user, news app service error : ", error)
    }
}

async function changeCategoriesAndPreferences(req, res) {
    try {
        const userWithNewSettings = req.body.userWithNewSettings;
        const { newCategories, newPreferences } = userWithNewSettings;
        isChangeCategoriesAndPreferencesValidIfNotThrowError(newCategories, newPreferences);
        const answer = await DaprUserService.changeCategoriesAndPreferences(userWithNewSettings); // TODO: TO TEST
        res.status(200).send(JSON.stringify({
            message: "Your preferences and categories has been updated.",
            data: answer.data
        }));
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
        console.log("Change categories and preferences, news app service error : ", error)

    }
}

async function changePreferences(req, res) {
    try {
        const userWithNewPreferences = req.body.userWithNewPreferences;
        isChangePreferencesValidIfNotThrowError(userWithNewPreferences.newPreferences);
        const answer = await DaprUserService.changePreferences(userWithNewPreferences); // TODO: TO TEST
        res.status(200).send(JSON.stringify({
            message: "Your preferences has been updated.",
            data: answer.data
        }));
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
        console.log("Change preferences, news app service error : ", error)
    }
}

async function changeEmail(req, res) {
    try {
        const userWithNewEmail = req.body.userWithNewEmail;
        isChangeEmailValidIfNotThrowError(userWithNewEmail.newEmail);
        const answer = await DaprUserService.changeEmail(userWithNewEmail); // TODO: TO TEST
        const message = `Your email has been updated.`;
        res.status(200).send(message);
    } catch (error) {
        // res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
        console.log(error);
    }
}

async function changePassword(req, res) {
    try {
        const userWithNewPassword = req.body.userWithNewPassword;
        isChangePasswordValidIfNotThrowError(userWithNewPassword.newPassword);
        const answer = await DaprUserService.changePassword(userWithNewPassword); // TODO: TO TEST
        const message = `Your password has been updated.`;
        res.status(200).send(message);
    } catch (error) {
        // res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
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
        // res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
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
