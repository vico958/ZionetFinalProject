const {changePasswordHelper,  changeEmailHelper, changeCategoriesAndPreferencesHelper, 
    changePreferencesHelper, userDeleteHelper,registerUserUsingAccessor, login} = require("../services/user/userFunctions")
const { sendNewsToClient} = require("../services/general");
const {isRegisterUserValidIfNotThrowError, isChangeCategoriesAndPreferencesIfNotThrowError} = require("../services/validation/userValidation/userValidation");
async function userRegister(req, res){
    try{
        const { userToRegister} = req.body;
        isRegisterUserValidIfNotThrowError(userToRegister)
        const returnedUser = await registerUserUsingAccessor(userToRegister);
        const {email, fullName, preferences, categories} = returnedUser
        const message = `${fullName} you register to the news app, we will send to you via email the news`
        res.status(200).send(message);
        res.end();
        sendNewsToClient(categories, preferences, email, fullName);
    }catch(error){
        res.status(error.statusCode).send(error.message)
        console.log(error);
    }
}

async function userDelete(req, res){
    try{//TODO : check if really need validation for req.body.user(i dont think need)
        const userToDelete = req.body.user;
        const answer = await userDeleteHelper(userToDelete);//TODO: check if really delete or not
        const message = `you been remove from news app`;
        res.status(200).send(message);
        res.end();
    }catch(error){
        res.status(error.statusCode).send(error.message)
        console.log(error);
    }
}

async function changeCategoriesAndPreferences(req, res){
    try{
        const userWithNewSettings = req.body.userWithNewSettings;
        const { categories, preferences } = userWithNewSettings
        isChangeCategoriesAndPreferencesIfNotThrowError(categories, preferences)
        const answer = await changeCategoriesAndPreferencesHelper(userWithNewSettings)//TODO:TO TEST
        const message = `you'r info has been change`
        res.status(200).send(message);
        res.end();
    }catch(error){
        res.status(error.statusCode).send(error.message)
        console.log(error);
    }
}

async function changePreferences(req, res){
    try{
        const userWithNewPreferences = req.body.userWithNewPreferences;
        const answer = await changePreferencesHelper(userWithNewPreferences)//TODO:TO TEST
        const message = `you'r info has been change`
        res.status(200).send(message);
        res.end();
    }catch(error){
        res.status(error.statusCode).send(error.message)
        console.log(error);
    }
}

async function changeEmail(req, res){
    try{
        const userWithNewEmail = req.body.userWithNewEmail;
        const answer = await changeEmailHelper(userWithNewEmail)//TODO:TO TEST
        const message = `you'r email has been change`
        res.status(200).send(message);
        res.end();
    }catch(error){
        res.status(error.statusCode).send(error.message)
        console.log(error);
    }
}

async function changePassword(req, res){
    try{
        const userWithNewPassword = req.body.userWithNewPassword;
        const answer = await changePasswordHelper(userWithNewPassword)//TODO:TO TEST
        const message = `you'r password has been change`
        res.status(200).send(message);
        res.end();
    }catch(error){
        res.status(error.statusCode).send(error.message)
        console.log(error);
    }
}

async function getNewsNow(req, res){
    try{
        res.status(200).send("We got your request, if your in the system you will get news in the next few minutes")
        const user = req.body.user;
        const loginUser = await login(user);
        const { categories, preferences, email, fullName} = loginUser
        sendNewsToClient(categories, preferences, email, fullName);
    }catch(error){
        res.status(error.statusCode).send(error.message)
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
}