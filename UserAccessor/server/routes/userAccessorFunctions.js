const userAccessorManger = require("../services/userAccessorManger")

async function userRegister(req, res){
    try{
        const { userToRegister} = req.body;
        const emailInLowerCase = userToRegister.email.toLowerCase()
        const isAlreadyInSytem = await userAccessorManger.getUserByEmail(emailInLowerCase);
        if(isAlreadyInSytem){
        res.status(400).send(JSON.stringify("Email already use"));
        }
        else{
            userToRegister.email = emailInLowerCase;
            const returnedData = await userAccessorManger.register(userToRegister);
            res.status(200).send(JSON.stringify(returnedData));
        }
    }catch(error){
        console.log(error)
    }
}

async function userLogin(req, res){
    try{
        // TODO: at the end when i choose if i use jwt or not
    }catch(error){
        console.log(error);
    }
}

async function changePassword(req, res) {
    try{
        const {newPassword, oldPassword} = req.body.user;
        const userId = req.user.id;
        const user = await userAccessorManger.getUserById(userId)
        if(oldPassword === user.password){
            await userAccessorManger.changePassword(userId, newPassword)
            res.status(200).send(JSON.stringify("Password changed"));
        }else{
            res.status(400).send(JSON.stringify("old password doesnt match"));
        }
    }catch(error){
        console.log(error)
    }
}

async function deleteUser(req, res){
    try{//TODO: check about id of user
        const {email, password} = req.body.userToDelete;
        const user = await userAccessorManger.getUserByEmail(email) // TODO: if there is no such user
        if(password === user.password){
            const answer = await userAccessorManger.deleteUser(user._id)
            res.status(200).send(JSON.stringify("user deleted"));
        }else{
            res.status(400).send(JSON.stringify("cant remove user"));
        }
    }catch(error){
        console.log(error)
    }
}

async function chagePreferences(req, res){
    try{
        const {email, password, preferences} = req.body.userWithNewPreferences;
        const user = await userAccessorManger.getUserByEmail(email) // TODO: if there is no such user
        if(password === user.password){
            const answer = await userAccessorManger.changeUserPreferences(user._id, preferences)
            res.status(200).send(JSON.stringify("user preferences changed"));
        }else{
            res.status(400).send(JSON.stringify("cant change user preferences"));
        }
    }catch(error){

    }
}

async function chageCategoriesAndPreferences(req, res){
    //TODO
}

module.exports = {
    userLogin,
    userRegister,
    changePassword,
    deleteUser,
    chagePreferences,
    chageCategoriesAndPreferences,
}