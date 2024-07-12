require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const daprHostAndServiceAppId = "useraccessor"; // Dapr Sidecar Host
const daprPort = "3500"; // Dapr Sidecar Port for user service
const client = new DaprClient({ daprHostAndServiceAppId, daprPort });
const userLogger = require("../services/logger");
const urlMethodBeggining = "user-accessor"
async function userRegister(req, res, next){
    try{     
        userLogger.info("User register event before accessor use")
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
          userLogger.info("User register event after accessor use")
    }catch(error){
        userLogger.fatal({
            error: error
        }, "Error occurred in user service during register event");
        next(error);
    }
}

async function userLogin(req, res, next){
    try{
        userLogger.info("User login event before accessor use")
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
        userLogger.info("User login event after accessor use")
    }catch(error){
        userLogger.fatal({
            error: error
        }, "Error occurred in user service during login event");
        next(error);
    }
}

async function changePassword(req, res, next) {
    try{
        userLogger.info("User change password event before accessor use")
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
        userLogger.info("User change password event after accessor use")
    }catch(error){
        userLogger.fatal({
            error: error
        }, "Error occurred in user service during change password event");
        
        next(error);
    }
}

async function deleteUser(req, res, next){
    try{
        userLogger.info("User delete event before accessor use")
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
        userLogger.info("User delete event after accessor use")
    }catch(error){
        userLogger.fatal({
            error: error
        }, "Error occurred in user service during delete user event");
        next(error);
    }
}

async function changeCategoriesAndPreferences(req, res, next){
    try{
        userLogger.info("User change categories and preferences event before accessor use")
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
            userLogger.info("User change categories and preferences event after accessor use")
        }catch(error){
            userLogger.fatal({
                error: error
            }, "Error occurred in user service during change categories and preferences event");
            next(error);
        }
}

async function chagePreferences(req, res, next){
    try{
        userLogger.info("User change preferences event before accessor use")
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
            userLogger.info("User change preferences event after accessor use")
        }catch(error){
            userLogger.fatal({
                error: error
            }, "Error occurred in user service during change preferences event");
            next(error);
        }
}

async function changeEmail(req, res, next){
    try{
        userLogger.info("User change email event before accessor use")
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
            userLogger.info("User change email event after accessor use")
        }catch(error){
            userLogger.fatal({
                error: error
            }, "Error occurred in user service during change email event");
            next(error);
        }
}

async function getAllUsers(req, res, next){
    try{
        userLogger.info("User get all users event before accessor use")
        const serviceMethod = `${urlMethodBeggining}/get-all-users`;
        const allUsers = await client.invoker.invoke(
                daprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.GET,
              );
            res.status(200).send(JSON.stringify(allUsers));
            res.end();
            userLogger.info("User get all users event after accessor use")
        }catch(error){
            userLogger.fatal({
                error: error
            }, "Error occurred in user service during get all users event");
            next(error);
        }
}

module.exports = {
    userRegister,
    changePassword,
    deleteUser,
    changeCategoriesAndPreferences,
    chagePreferences,
    changeEmail,
    userLogin,
    getAllUsers
}