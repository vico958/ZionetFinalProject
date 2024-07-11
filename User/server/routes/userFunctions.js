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
        res.status(200).send(JSON.stringify(returnedData));
        res.end();
    }catch(error){
        console.log("user register, user service error : ", error)
        throw error
    }
}

async function userLogin(req, res){
    try{
        const serviceMethod = `${urlMethodBeggining}/login`;
        const { userToLogin} = req.body;
        const returnedData = await client.invoker.invoke(
            daprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.POST,
            {userToLogin} ,
            { headers: { 'Content-Type': 'application/json' } },
          );

         //TODO : Handle returnedData
        res.status(200).send(JSON.stringify(returnedData));
        res.end();
    }catch(error){
        console.log(error)
    }
}

async function changePassword(req, res) {
    try{
        const serviceMethod = `${urlMethodBeggining}/change-password`;
        const { userWithNewPassword} = req.body.userWithNewPassword;
        const returnedData = await client.invoker.invoke(
            daprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.PUT,
            {userWithNewPassword} ,
            { headers: { 'Content-Type': 'application/json' } },
            );
    
            //TODO : Handle returnedData
        res.status(200).send(JSON.stringify(returnedData));
        res.end();
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
        res.status(200).send(JSON.stringify(returnedData));
        res.end();
    }catch(error){
        console.log("delete user, user service error : ", error)
        throw error
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
            console.log("Change categories and preferences, user service error : ", error)
            throw error
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
            console.log("Change preferences, user service error : ", error)
            throw error
        }
}

async function changeEmail(req, res){
    try{
        const userWithNewEmail = req.body.userWithNewEmail;
        const serviceMethod = `${urlMethodBeggining}/change-email`;
        const returnedData = await client.invoker.invoke(
                daprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.PUT,
                {userWithNewEmail} ,
                { headers: { 'Content-Type': 'application/json' } },
              );
    
             //TODO : Handle returnedData
            res.status(200).send(JSON.stringify(returnedData));
            res.end();
        }catch(error){
            console.log(error)
        }
}

async function getAllUsers(req, res){
    try{
        const serviceMethod = `${urlMethodBeggining}/get-all-users`;
        const allUsers = await client.invoker.invoke(
                daprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.GET,
              );
    
             //TODO : Handle returnedData
            res.status(200).send(JSON.stringify(allUsers));
            res.end();
        }catch(error){
            console.log(error)
        }
}

module.exports = {
    userRegister,
    changePassword,
    deleteUser,
    chageCategoriesAndPreferences,
    chagePreferences,
    changeEmail,
    userLogin,
    getAllUsers
}