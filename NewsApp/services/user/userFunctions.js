require("dotenv").config()
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const userDaprHostAndServiceAppId = "user"; // Dapr Sidecar Host
const daprPort = "3500"; // Dapr Sidecar Port for user service
const userClientDapr = new DaprClient({ userDaprHostAndServiceAppId, daprPort });
const userUrlMethodBeggining = "user"

async function registerUserUsingAccessor(userToRegister){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/register`;
        return await userClientDapr.invoker.invoke(
            userDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.POST,
            {userToRegister} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
    }catch(error){
        console.log(error);
    }
}

async function userDeleteHelper(userToDelete){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/delete-user`;
        const asnwer = await userClientDapr.invoker.invoke(
            userDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.DELETE,
            {userToDelete} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return asnwer;
    }catch(error){
        console.log(error);
    }
}

async function changeCategoriesAndPreferencesHelper(userWithNewSettings){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/change-categories-and-preferences`;
        const asnwer = await userClientDapr.invoker.invoke(
            userDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.PUT,
            {userWithNewSettings} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return asnwer;
    }catch(error){
        console.log(error);
    }
}

async function changePreferencesHelper(userWithNewPreferences){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/change-preferences`;
        const asnwer = await userClientDapr.invoker.invoke(
            userDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.PUT,
            {userWithNewPreferences} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return asnwer;
    }catch(error){
        console.log(error);
    }
}

async function changePasswordHelper(userWithNewPassword){
    try{
        const serviceMethod = `${userUrlMethodBeggining}/change-password`;
        const asnwer = await userClientDapr.invoker.invoke(
            userDaprHostAndServiceAppId,
            serviceMethod,
            HttpMethod.PUT,
            {userWithNewPassword} ,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return asnwer;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    registerUserUsingAccessor,
    userDeleteHelper,
    changeCategoriesAndPreferencesHelper,
    changePreferencesHelper,
    changePasswordHelper,
}