require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const daprHostAndServiceAppId = "useraccessor"; // Dapr Sidecar Host
const daprPort = "3500"; // Dapr Sidecar Port for user service
const client = new DaprClient({ daprHostAndServiceAppId, daprPort });

const urlMethodBeggining = "user-accessor"
async function userRegister(req, res, next){
    try{
        const serviceMethod = `${urlMethodBeggining}/register`;
        const { userToRegister} = req.body;
        const returnedUser = await client.invoker.invoke(
            daprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.POST,
            {userToRegister} ,
            { headers: { 'Content-Type': 'application/json' } },
          );
        res.status(200).send(JSON.stringify(returnedUser));
        res.end();
    }catch(error){
        console.error("user register, user service error : ", error)
        next(error);
    }
}

async function userLogin(req, res, next){
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

         
        res.status(200).send(JSON.stringify(returnedData));
        res.end();
    }catch(error){
        console.error("User login, user service error : ", error)
        next(error);
    }
}

async function changePassword(req, res, next) {
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
    
            
        res.status(200).send(JSON.stringify(returnedData));
        res.end();
    }catch(error){
        console.error("Change password, user service error : ", error)
        next(error);
    }
}

async function deleteUser(req, res, next){
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
        res.status(200).send(returnedData);
        res.end();
    }catch(error){
        console.error("delete user, user service error ", error)
        next(error);
    }
}

async function chageCategoriesAndPreferences(req, res, next){
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
             
            res.status(200).send(JSON.stringify(returnedData));
            res.end();
        }catch(error){
            console.error("Change categories and preferences, user service error : ", error);
            next(error);
        }
}

async function chagePreferences(req, res, next){
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
    
             
            res.status(200).send(JSON.stringify(returnedData));
            res.end();
        }catch(error){
            console.error("Change preferences, user service error : ", error);
            next(error);
        }
}

async function changeEmail(req, res, next){
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
            res.status(200).send(JSON.stringify(returnedData));
            res.end();
        }catch(error){
            console.error("Change email, user service error : ", error);
            next(error);
        }
}

async function getAllUsers(req, res, next){
    try{
        const serviceMethod = `${urlMethodBeggining}/get-all-users`;
        const allUsers = await client.invoker.invoke(
                daprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.GET,
              );
            res.status(200).send(JSON.stringify(allUsers));
            res.end();
        }catch(error){
            console.error("Get all users, user service error : ", error);
            next(error);
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