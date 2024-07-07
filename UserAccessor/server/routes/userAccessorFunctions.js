const userAccessorManger = require("../services/userAccessorManger")

async function userRegister(req, res){
    try{
        console.log("1111");
        console.log(req.body);
        const { userToRegister} = req.body;
        console.log("email is :", userToRegister.email);
        console.log("222222")
        const emailInLowerCase = userToRegister.email.toLowerCase()
        console.log("email is :", emailInLowerCase);
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

async function check(req, res){
    try{
        const { userToRegister} = req.body;
        const emailInLowerCase = userToRegister.email.toLowerCase()
        const returnedData = await userAccessorManger.getUserByEmail(emailInLowerCase)
        res.status(500).send(JSON.stringify({returnedData}));
        res.end();
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    userLogin,
    userRegister,
    changePassword,
    check
}