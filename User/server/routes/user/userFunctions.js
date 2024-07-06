async function userRegister(req, res){
    try{
        const { userToRegister} = req.body;
        const emailInLowerCase = userToRegister.email.toLowerCase()
        const isAlreadyInSytem = await userManger.getUserByEmail(emailInLowerCase);
        if(isAlreadyInSytem){
        res.status(400).send(JSON.stringify("Email already use"));
        res.end();
        }
        else{
            userToRegister.email = emailInLowerCase;
            const returnedData = await userManger.register(userToRegister);
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
        const user = await userManger.getUserById(userId)
        if(oldPassword === user.password){
            await userManger.changePassword(userId, newPassword)
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

module.exports = {
    userLogin,
    userRegister,
    changePassword,
}