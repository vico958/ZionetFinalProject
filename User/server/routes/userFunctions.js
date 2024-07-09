require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const daprHostAndServiceAppId = "useraccessor"; // Dapr Sidecar Host
const daprPort = "3500"; // Dapr Sidecar Port for user service
const client = new DaprClient({ daprHostAndServiceAppId, daprPort });

const urlMethodBeggining = "user-accessor"
async function userRegister(req, res){
    try{
        const serviceMethod = `${urlMethodBeggining}/register`;
        const { userToRegister} = req.body;
        const returnedData = await client.invoker.invoke(
            daprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.POST,
            {userToRegister} ,
            { headers: { 'Content-Type': 'application/json' } },
          );

         //TODO : Handle returnedData
        res.status(200).send(JSON.stringify(returnedData));
        res.end();
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
    try{ // TODO:
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

async function deleteUser(req, res){
    try{
    const userToDelete = req.body.userToDelete;
    const serviceMethod = `${urlMethodBeggining}/delete-user`;
    const returnedData = await client.invoker.invoke(
            daprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.DELETE,
            {userToDelete} ,
            { headers: { 'Content-Type': 'application/json' } },
          );

         //TODO : Handle returnedData
        res.status(200).send(JSON.stringify(returnedData));
        res.end();
    }catch(error){
        console.log(error)
    }
}

async function chageCategoriesAndPreferences(req, res){
    try{
        const userWithNewSettings = req.body.userWithNewSettings;
        const serviceMethod = `${urlMethodBeggining}/change-categories-and-preferences`;
        const returnedData = await client.invoker.invoke(
                daprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.PUT,
                {userWithNewSettings} ,
                { headers: { 'Content-Type': 'application/json' } },
              );
    
             //TODO : Handle returnedData
            res.status(200).send(JSON.stringify(returnedData));
            res.end();
        }catch(error){
            console.log(error)
        }
}

async function chagePreferences(req, res){
    try{
        const userWithNewPreferences = req.body.userWithNewPreferences;
        const serviceMethod = `${urlMethodBeggining}/change-preferences`;
        const returnedData = await client.invoker.invoke(
                daprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.PUT,
                {userWithNewPreferences} ,
                { headers: { 'Content-Type': 'application/json' } },
              );
    
             //TODO : Handle returnedData
            res.status(200).send(JSON.stringify(returnedData));
            res.end();
        }catch(error){
            console.log(error)
        }
}
module.exports = {
    userLogin,
    userRegister,
    changePassword,
    deleteUser,
    chageCategoriesAndPreferences,
    chagePreferences
}