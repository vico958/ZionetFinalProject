const userAccessorManger = require("../services/userAccessorManger")

async function userRegister(req, res){
    try{
        const { userToRegister} = req.body;
        const emailInLowerCase = userToRegister.email.toLowerCase()
        const isAlreadyInSytem = await userAccessorManger.getUserByEmail(emailInLowerCase);
        if(isAlreadyInSytem){
        res.status(400).send(JSON.stringify("Email already use"));
        res.end();
        }
        else{
            userToRegister.email = emailInLowerCase;
            const returnedData = await userAccessorManger.register(userToRegister);
            res.status(200).send(JSON.stringify({returnedData}));
            res.end();
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
            res.end();
        }else{
            res.status(400).send(JSON.stringify("old password doesnt match"));
            res.end();
        }
    }catch(error){
        console.log(error)
    }
}

async function deleteUser(req, res){
    try{
        const {email, passwrod} = req.body.userToDelete;
        const user = await userAccessorManger.getUserByEmail(email) // TODO: if there is no such user
        if(passwrod === user.password){
            const answer = await userAccessorManger.deleteUser(user.userId, passwrod)
            res.status(200).send(JSON.stringify("user deleted"));
            res.end();
        }else{
            res.status(400).send(JSON.stringify("cant remove user"));
            res.end();
        }
    }catch(error){
        console.log(error)
    }
}
module.exports = {
    userLogin,
    userRegister,
    changePassword,
    deleteUser
}