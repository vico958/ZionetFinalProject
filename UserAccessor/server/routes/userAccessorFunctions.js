const userAccessorManger = require("../services/userAccessor/userAccessorManger")
const {createError} = require("../services/general")

async function userRegister(req, res, next){
    try{
        const { userToRegister} = req.body;
        const emailInLowerCase = userToRegister.email.toLowerCase()
        const isAlreadyInSytem = await userAccessorManger.getUserByEmail(emailInLowerCase);
        if(isAlreadyInSytem){
            throw createError("Email already use", 400);
        }
        else{
            userToRegister.email = emailInLowerCase;
            const returnedUser = await userAccessorManger.register(userToRegister);
            returnResAnswer(res, "User saved in system",returnedUser);
        }
    }catch(error){
        console.error("user register, user accessor service error : ", error);
        next(error);
    }
}

async function deleteUser(req, res, next){
    try{
        const {email, password} = req.body.userToDelete;
        const user = await getUserByEmailHelper(email);
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
        console.error("delete user, user accessor service ", error);
        next(error);
    }
}

async function userLogin(req, res, next){
    try{
        const { email, password} = req.body.userToLogin;
        const user = await getUserByEmailHelper(email);
        if(password === user.password){
            returnResAnswer(res, "User login", user);
        }
        else{
            throw createError("Email or password are not valid", 400);// For saftey not letting them know if its email or password not good
        }
    }catch(error){
        console.error("user login, user accessor service ", error);
        next(error);
    }
}

async function changePassword(req, res, next) {
    try{//TODO :TEST
        const {newPassword, oldPassword, email} = req.body.userWithNewPassword;
        const user = await getUserByEmailHelper(email);
        if(oldPassword === user.password){
            const answer = await userAccessorManger.changePassword(user.userId, newPassword)
            const messageFail = "Cant update Password";
            const messageSuccess = "Password updated";
            changeAfterHavingUserHelper(res, messageSuccess, messageFail, answer)
        }else{
            throw createError("old password doesnt match", 400);
        }
    }catch(error){
        console.error("change password, user accessor service ", error);
        next(error);
    }
}


async function chagePreferences(req, res, next){
    try{//TODO :TEST
        const {email, password, newPreferences} = req.body.userWithNewPreferences;
        const user = await getUserByEmailHelper(email);
        if(password === user.password){
            const answer = await userAccessorManger.changeUserPreferences(user._id, newPreferences)
            const messageFail = "Cant update preferences";
            const messageSuccess = "User preferences has been updated."
            changeAfterHavingUserHelper(res, messageSuccess, messageFail, answer)
        }else{
            throw createError("Password dont match", 400);
        }
    }catch(error){
        console.error("Change preferences, user accessor service error : ", error)
        next(error);
    }
}

async function chageCategoriesAndPreferences(req, res, next){
    try{//TODO :TEST
        const {email, password, newCategories, newPreferences} = req.body.userWithNewSettings;
        const user = await getUserByEmailHelper(email);
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
        console.error("Change categories and preferences, user accessor service error : ", error)
        next(error);
    }
}

async function changeEmail(req, res, next){
    try{//TODO :TEST
        const {email, password, newEmail } = req.body.userWithNewEmail;
        const user = await getUserByEmailHelper(email);
        if(password === user.password){//TODO: check first categories change and only then change preferences
            const answer = await userAccessorManger.changeUserEmail(user._id, newEmail)
            const messageFail = "Cant update email";
            const messageSuccess = "User email has been updated.";
            changeAfterHavingUserHelper(res, messageSuccess, messageFail, answer)
        }else{
            throw createError("Password dont match", 400);
        }
    }catch(error){
        console.error("Change email, user accessor service error : ", error)
        next(error);
    }
}


async function getAllUsers(req, res, next){
    try{
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
        console.error("Get all users, user accessor service error : ", error)
        next(error);
    }
}

async function getUserByEmailHelper(email){
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
}

module.exports = {
    userRegister,
    changePassword,
    deleteUser,
    chagePreferences,
    chageCategoriesAndPreferences,
    changeEmail,
    userLogin,
    getAllUsers
}