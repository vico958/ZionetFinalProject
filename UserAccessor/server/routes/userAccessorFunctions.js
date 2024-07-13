const userAccessorManger = require("../services/userAccessor/userAccessorManger")
const {createError} = require("../services/general")
const userAccessorLogger = require("../services/logger/logger");


async function hellowWorldCheck(req, res){
    userAccessorLogger.info("Hello world from user accessor service");
    res.send("Hello world from user accessor service");
};
async function userRegister(req, res, next){
    try{
        userAccessorLogger.info("Enter userRegister end point")
        const { userToRegister} = req.body;
        const emailInLowerCase = userToRegister.email.toLowerCase()
        const isAlreadyInSytem = await userAccessorManger.getUserByEmail(emailInLowerCase);
        if(isAlreadyInSytem){
            userAccessorLogger.warn("Email already use")
            throw createError("Email already use", 400);
        }
        else{
            userToRegister.email = emailInLowerCase;
            const returnedUser = await userAccessorManger.register(userToRegister);
            returnResAnswer(res, "User saved in system",returnedUser);
        }
    }catch(error){
        userAccessorLogger.fatal({
            error: error
        }, "Error occurred during userRegister event");
        next(error);
    }
}

async function deleteUser(req, res, next){
    try{
        userAccessorLogger.info("Enter deleteUser end point")
        const {email, password} = req.body.userToDelete;
        const user = await getUserByEmailAndIfNotFoundThrowError(email);
        if(password === user.password){
            const response = await userAccessorManger.deleteUser(user._id)
            if(response.deletedCount === 1){
                returnResAnswer(res, "User deleted", response)
            }else{
                throw createError("Cant remove user", 500);
            }
        }else{
            throw createError("Unable to remove user: the provided password is incorrect.", 400);
        }
    }catch(error){
        userAccessorLogger.fatal({
            error: error
        }, "Error occurred during deleteUser event");
        next(error);
    }
}

async function userLogin(req, res, next){
    try{
        userAccessorLogger.info("Enter userLogin end point")
        const { email, password} = req.body.userToLogin;
        const user = await getUserByEmailAndIfNotFoundThrowError(email);
        if(password === user.password){
            returnResAnswer(res, "User login", user);
        }
        else{
            throw createError("Email or password are not valid", 400);// For saftey not letting them know if its email or password not good
        }
    }catch(error){
        userAccessorLogger.fatal({
            error: error
        }, "Error occurred during userLogin event");
        next(error);
    }
}

async function changePassword(req, res, next) {
    try{//TODO :TEST
        userAccessorLogger.info("Enter changePassword end point")
        const {newPassword, oldPassword, email} = req.body.userWithNewPassword;
        const user = await getUserByEmailAndIfNotFoundThrowError(email);
        if(oldPassword === user.password){
            const answer = await userAccessorManger.changePassword(user.userId, newPassword)
            const messageFail = "Cant update Password";
            const messageSuccess = "Password updated";
            changeAfterHavingUserHelper(res, messageSuccess, messageFail, answer)
        }else{
            throw createError("old password doesnt match", 400);
        }
    }catch(error){
        userAccessorLogger.fatal({
            error: error
        }, "Error occurred during changePassword event");
        next(error);
    }
}


async function chagePreferences(req, res, next){
    try{//TODO :TEST
        userAccessorLogger.info("Enter chagePreferences end point")
        const {email, password, newPreferences} = req.body.userWithNewPreferences;
        const user = await getUserByEmailAndIfNotFoundThrowError(email);
        if(password === user.password){
            const answer = await userAccessorManger.changeUserPreferences(user._id, newPreferences)
            const messageFail = "Cant update preferences";
            const messageSuccess = "User preferences has been updated."
            changeAfterHavingUserHelper(res, messageSuccess, messageFail, answer)
        }else{
            throw createError("Password dont match", 400);
        }
    }catch(error){
        userAccessorLogger.fatal({
            error: error
        }, "Error occurred during chagePreferences event");
        next(error);
    }
}

async function chageCategoriesAndPreferences(req, res, next){
    try{//TODO :TEST
        userAccessorLogger.info("Enter chageCategoriesAndPreferences end point")
        const {email, password, newCategories, newPreferences} = req.body.userWithNewSettings;
        const user = await getUserByEmailAndIfNotFoundThrowError(email);
        if(password === user.password){//TODO: check first categories change and only then change preferences
            const {_id} = user
            const answerCategories = await userAccessorManger.changeUserCategories(_id, newCategories)
            const answerPreferences = await userAccessorManger.changeUserPreferences(_id, newPreferences)
            const messageFail = "Cant update preferences and categories";
            const messageSuccess = "User preferences and categories has been updated.";
            changeAfterHavingUserHelper(res, messageSuccess, messageFail, answerPreferences) // its enough to check only one because same _id
        }else{
            throw createError("Password dont match", 400);
        }
    }catch(error){
        userAccessorLogger.fatal({
            error: error
        }, "Error occurred during chageCategoriesAndPreferences event");
        next(error);
    }
}

async function changeEmail(req, res, next){
    try{//TODO :TEST
        userAccessorLogger.info("Enter changeEmail end point")
        const {email, password, newEmail } = req.body.userWithNewEmail;
        const user = await getUserByEmailAndIfNotFoundThrowError(email);
        if(password === user.password){//TODO: check first categories change and only then change preferences
            const newEmailInLowerCase = newEmail.toLowerCase();
            const userWithNewEmail = await userAccessorManger.getUserByEmail(newEmailInLowerCase);
            if(userWithNewEmail){
                throw createError("Email already use", 400);
            }
            const answer = await userAccessorManger.changeUserEmail(user._id, newEmail)
            const messageFail = "Cant update email";
            const messageSuccess = "User email has been updated.";
            changeAfterHavingUserHelper(res, messageSuccess, messageFail, answer)
        }else{
            throw createError("Password dont match", 400);
        }
    }catch(error){
        userAccessorLogger.fatal({
            error: error
        }, "Error occurred during changeEmail event");
        next(error);
    }
}


async function getAllUsers(req, res, next){
    try{
        userAccessorLogger.info("Enter getAllUsers end point")
        const allUsers = await userAccessorManger.getAllUsers();
        if(allUsers === null){
            throw createError("No users in db", 404);
        }
        const transformedUsers = allUsers.map(user => ({
            email: user.email,
            fullName: user.fullName,
            preferences: user.preferences,
            categories: user.categories
        }));
        returnResAnswer(res, "All users list", transformedUsers);
    }catch(error){
        userAccessorLogger.fatal({
            error: error
        }, "Error occurred during getAllUsers event");
        next(error);
    }
}

async function getUserByEmailAndIfNotFoundThrowError(email){
    try{
        const emailInLowerCase = email.toLowerCase();
        const user = await userAccessorManger.getUserByEmail(emailInLowerCase);
        if(user === null){
            throw createError("Email or password are not valid", 400);// For saftey not letting them know if its email or password not good
        }
        return user;
    }catch(error){
        throw error
    }
}

function changeAfterHavingUserHelper(res, messageSuccess, messageFail, answer){
    if(answer === null){
        throw createError(messageFail, 400);
    }else{
        returnResAnswer(res, messageSuccess, answer);
    }
}

function returnResAnswer(res, messageToSend, dataToSend){
    res.status(200).send(JSON.stringify({
        message: messageToSend,
        data: dataToSend
    }));
    userAccessorLogger.info(`${messageToSend}`);
}

module.exports = {
    userRegister,
    changePassword,
    deleteUser,
    chagePreferences,
    chageCategoriesAndPreferences,
    changeEmail,
    userLogin,
    getAllUsers,
    hellowWorldCheck
}