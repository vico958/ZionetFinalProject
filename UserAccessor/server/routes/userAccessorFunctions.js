const userAccessorManger = require("../services/userAccessor/userAccessorManger")
const {createError} = require("../services/general")
async function userRegister(req, res){
    try{
        const { userToRegister} = req.body;
        const emailInLowerCase = userToRegister.email.toLowerCase()
        const isAlreadyInSytem = await userAccessorManger.getUserByEmail(emailInLowerCase);
        if(isAlreadyInSytem){
            const error = createError("Email already use", 400);
            throw error
        }
        else{
            userToRegister.email = emailInLowerCase;
            const returnedData = await userAccessorManger.register(userToRegister);
            res.status(200).send(JSON.stringify(returnedData));
        }
    }catch(error){
        console.log("user register, user accessor service error : ", error)
        throw error
    }
}

async function changePassword(req, res) {
    try{//TODO :TEST
        const {newPassword, oldPassword, email} = req.body.userWithNewPassword;
        const user = await userAccessorManger.getUserByEmail(email)
        if(oldPassword === user.password){
            await userAccessorManger.changePassword(user.userId, newPassword)
            res.status(200).send(JSON.stringify("Password changed"));
        }else{
            res.status(400).send(JSON.stringify("old password doesnt match"));
        }
    }catch(error){
        console.log(error)
    }
}

async function deleteUser(req, res){
    try{
        const {email, password} = req.body.userToDelete;
        const user = await userAccessorManger.getUserByEmail(email) // TODO: if there is no such user
        if(user === null){
            throw createError("User not found", 404)
        }
        if(password === user.password){
            const response = await userAccessorManger.deleteUser(user._id)
            if(response.deletedCount === 1){
                res.status(200).send(JSON.stringify("User deleted"));
            }else{
            throw createError("Cant remove user", 500);
            }
        }else{
            throw createError("Unable to remove user: the provided password is incorrect.", 400);
        }
    }catch(error){
        console.log("delete user, user accessor service error : ", error)
        throw error
    }
}

async function chagePreferences(req, res){
    try{//TODO :TEST
        const {email, password, newPreferences} = req.body.userWithNewPreferences;
        const user = getUserByEmailHelper(email);
        if(password === user.password){
            const answer = await userAccessorManger.changeUserPreferences(user._id, newPreferences)
            if(answer === null){
                throw createError("Cant update preferences", 400);
            }else{
                res.status(200).send(JSON.stringify({
                    message: "User preferences has been updated.",
                    data: answer
                }));
            }
        }else{
            throw createError("Password dont match", 400);
        }
    }catch(error){
        console.log("Change preferences, user accessor service error : ", error)
        throw error
    }
}

async function chageCategoriesAndPreferences(req, res){
    try{//TODO :TEST
        const {email, password, newCategories, newPreferences} = req.body.userWithNewSettings;
        const user = getUserByEmailHelper(email);
        if(password === user.password){//TODO: check first categories change and only then change preferences
            const {_id} = user
            const answerCategories = await userAccessorManger.changeUserCategories(_id, newCategories)
            const answerPreferences = await userAccessorManger.changeUserPreferences(_id, newPreferences)
            if(answerCategories === null){ // its enogth to check only one because same _id
                throw createError("Cant update preferences and categories", 400);
            }else{
                res.status(200).send(JSON.stringify({
                    message: "User preferences and categories has been updated.",
                    data: answerPreferences
                }));
            }
        }else{
            throw createError("Password dont match", 400);
        }
    }catch(error){
        console.log("Change categories and preferences, user accessor service error : ", error)
        throw error
    }
}

async function changeEmail(req, res){
    try{//TODO :TEST
        const {email, password, newEmail } = req.body.userWithNewEmail;
        const user = getUserByEmailHelper(email);
        if(password === user.password){//TODO: check first categories change and only then change preferences
            const answer = await userAccessorManger.changeUserEmail(user._id, newEmail)
            if(answer === null){
                throw createError("Cant update email", 400);
            }else{
                res.status(200).send(JSON.stringify({
                    message: "User email has been updated.",
                    data: answerPreferences
                }));
            }
        }else{
            throw createError("Password dont match", 400);
        }
    }catch(error){
        console.log("Change email, user accessor service error : ", error)
        throw error
    }
}

async function userLogin(req, res){
    try{
        const { email, password} = req.body.userToLogin;
        const emailInLowerCase = email.toLowerCase()
        const user = await userAccessorManger.getUserByEmail(emailInLowerCase);
        if(user === null){
            res.status(400).send(JSON.stringify("Email or password are not valid")); // For saftey not letting them know if its email or password not good
        }
        else if(password === user.password){
            res.status(200).send(JSON.stringify(user));
        }
        else{
            res.status(400).send(JSON.stringify("Email or password are not valid"))
        }
    }catch(error){
        console.log(error)
    }
}

async function getAllUsers(req, res){
    try{
        const allUsers = await userAccessorManger.getAllUsers();
        const transformedUsers = allUsers.map(user => ({
            email: user.email,
            fullName: user.fullName,
            preferences: user.preferences,
            categories: user.categories
        }));
        res.status(200).send(JSON.stringify(transformedUsers));
    }catch(error){
        console.log(error);
    }
}

async function getUserByEmailHelper(email){
    const emailInLowerCase = email.toLowerCase();
    const user = await userAccessorManger.getUserByEmail(emailInLowerCase);
    if(user === null){
        const error = createError("Email or password are not valid", 400);// For saftey not letting them know if its email or password not good
        throw error
    }
    return user;
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