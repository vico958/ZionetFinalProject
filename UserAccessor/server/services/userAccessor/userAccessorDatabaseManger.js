const { user } = require("../../storages/models/user")
const {handleDatabaseError} = require("./errorHandlerDatabaseManger");
const userAccessorLogger = require("../logger/logger");

class userDatabaseManager {
    register = async (userToRegister) => {
        userAccessorLogger.info(`Entering register function in userDatabaseManager`);
        const newUser = new user({
            email:userToRegister.email,
            password:userToRegister.password,
            fullName:userToRegister.fullName,
            preferences:userToRegister.preferences,
            categories:userToRegister.categories
        })
        try{
            const result = await newUser.save()
            userAccessorLogger.info(`Exiting register function in userDatabaseManager`);
            return result;
        } catch(error){
            handleDatabaseError(error);
        }
    }

    getUserByEmail = async (email) => {
        try{
            userAccessorLogger.info(`Entering getUserByEmail function in userDatabaseManager`);
            const result = await user.findOne({email:email});
            userAccessorLogger.info(`Exiting getUserByEmail function in userDatabaseManager`);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    
    getUserById = async (userId) => {
        try{
            userAccessorLogger.info(`Entering getUserById function in userDatabaseManager`);
            const result = await user.findOne({_id:userId});
            userAccessorLogger.info(`Exiting getUserById function in userDatabaseManager`);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }
    
    changePassword = async (userId, newPassword) => {
        try{
            userAccessorLogger.info(`Entering changePassword function in userDatabaseManager`);
            const result = await this.changeUserDataHelper(userId, newPassword, "password")
            userAccessorLogger.info(`Exiting changePassword function in userDatabaseManager`);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    changeFullName = async (userId, newFullName) => {
        try{
            userAccessorLogger.info(`Entering changeFullName function in userDatabaseManager`);
            const result = await this.changeUserDataHelper(userId, newFullName, "fullName");
            userAccessorLogger.info(`Exiting changeFullName function in userDatabaseManager`);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    changeUserCategories = async (userId, newCategories) => {
        try{
            userAccessorLogger.info(`Entering changeUserCategories function in userDatabaseManager`);
            const result = await this.changeUserDataHelper(userId, newCategories, "categories");
            userAccessorLogger.info(`Exiting changeUserCategories function in userDatabaseManager`);
            return result
        }catch(error){
            handleDatabaseError(error);
        }
    }

    changeUserPreferences = async (userId, newPreferences) => {
        try{
            userAccessorLogger.info(`Entering changeUserPreferences function in userDatabaseManager`);
            const result = await this.changeUserDataHelper(userId, newPreferences, "preferences");
            userAccessorLogger.info(`Exiting changeUserPreferences function in userDatabaseManager`);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    
    changeUserEmail = async(userId, newEmail) =>{
        try{
            userAccessorLogger.info(`Entering changeUserEmail function in userDatabaseManager`);
            const result = await this.changeUserDataHelper(userId, newEmail, "email");
            userAccessorLogger.info(`Exiting changeUserEmail function in userDatabaseManager`);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }
    
    changeUserDataHelper = async(userId, newData, dataField) => {
        try{
            userAccessorLogger.info(`Entering changeUserDataHelper function in userDatabaseManager`);
            const result = await user.findByIdAndUpdate({_id:userId}, {[dataField]: newData}, {new:true});
            userAccessorLogger.info(`Exiting changeUserDataHelper function in userDatabaseManager`);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }
    
    deleteUser = async(userId) => {
        try{
            userAccessorLogger.info(`Entering deleteUser function in userDatabaseManager`);
            const result = await user.deleteOne({_id:userId});
            userAccessorLogger.info(`Exiting deleteUser function in userDatabaseManager`);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    getAllUsers = async() => {
        try{
            userAccessorLogger.info(`Entering getAllUsers function in userDatabaseManager`);
            const result = await user.find({})
            userAccessorLogger.info(`Exiting getAllUsers function in userDatabaseManager`);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }
}
module.exports = userDatabaseManager