require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const daprHostAndServiceAppId = "useraccessor"; // Dapr Sidecar Host
const daprPort = "3500"; // Dapr Sidecar Port for user service
const client = new DaprClient({ daprHostAndServiceAppId, daprPort });
const logger = require("../services/logger");
const urlMethodBeggining = "user-accessor"
async function userRegister(req, res, next){
    try{     
        logger.info("User register event before accessor use")
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
          logger.info("User register event after accessor use")
    }catch(error){
        logger.fatal({
            error: error
        }, "Error occurred in user service during register method");
        next(error);
    }
}

async function userLogin(req, res, next){
    try{
        logger.info("User login event before accessor use")
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
        logger.info("User login event after accessor use")
    }catch(error){
        logger.fatal({
            error: error
        }, "Error occurred in user service during login method");
        next(error);
    }
}

async function changePassword(req, res, next) {
    try{
        logger.info("User change password event before accessor use")
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
        logger.info("User change password event after accessor use")
    }catch(error){
        logger.fatal({
            error: error
        }, "Error occurred in user service during change password method");
        
        next(error);
    }
}

async function deleteUser(req, res, next){
    try{
        logger.info("User delete event before accessor use")
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
        logger.info("User delete event after accessor use")
    }catch(error){
        logger.fatal({
            error: error
        }, "Error occurred in user service during delete user method");
        next(error);
    }
}

async function changeCategoriesAndPreferences(req, res, next){
    try{
        logger.info("User change categories and preferences event before accessor use")
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
            logger.info("User change categories and preferences event after accessor use")
        }catch(error){
            logger.fatal({
                error: error
            }, "Error occurred in user service during change categories and preferences method");
            next(error);
        }
}

async function chagePreferences(req, res, next){
    try{
        logger.info("User change preferences event before accessor use")
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
            logger.info("User change preferences event after accessor use")
        }catch(error){
            logger.fatal({
                error: error
            }, "Error occurred in user service during change preferences method");
            next(error);
        }
}

async function changeEmail(req, res, next){
    try{
        logger.info("User change email event before accessor use")
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
            logger.info("User change email event after accessor use")
        }catch(error){
            logger.fatal({
                error: error
            }, "Error occurred in user service during change email method");
            next(error);
        }
}

async function getAllUsers(req, res, next){
    try{
        logger.info("User get all users event before accessor use")
        const serviceMethod = `${urlMethodBeggining}/get-all-users`;
        const allUsers = await client.invoker.invoke(
                daprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.GET,
              );
            res.status(200).send(JSON.stringify(allUsers));
            res.end();
            logger.info("User get all users event after accessor use")
        }catch(error){
            logger.fatal({
                error: error
            }, "Error occurred in user service during get all users method");
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