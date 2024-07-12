const { user } = require("../../storages/models/user")
const mongoose = require('mongoose');
const {handleDatabaseError} = require("./errorHandlerDatabaseManger");
const userAccessorLogger = require("../logger/logger");
const dbUri = 'mongodb://mongoDb:27017/userDb';

mongoose.connect(dbUri, { //TODO: change location of connect and try catch and so ...
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

class userDatabaseManager {
    register = async (userToRegister) => {
        const functionName = "register";
        this.logEntering(functionName);
        const newUser = new user({
            email:userToRegister.email,
            password:userToRegister.password,
            fullName:userToRegister.fullName,
            preferences:userToRegister.preferences,
            categories:userToRegister.categories
        })
        try{
            const result = await newUser.save()
            this.logExiting(functionName);
            return result;
        } catch(error){
            handleDatabaseError(error);
        }
    }

    getUserByEmail = async (email) => {
        try{
            const functionName = "getUserByEmail";
            this.logEntering(functionName);
            const result = await user.findOne({email:email});
            this.logExiting(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    
    getUserById = async (userId) => {
        try{
            const functionName = "getUserById";
            this.logEntering(functionName);
            const result = await user.findOne({_id:userId});
            this.logExiting(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }
    
    changePassword = async (userId, newPassword) => {
        try{
            const functionName = "changePassword";
            this.logEntering(functionName);
            const result = await this.changeUserDataHelper(userId, newPassword, "password")
            this.logExiting(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    changeFullName = async (userId, newFullName) => {
        try{
            const functionName = "changeFullName";
            this.logEntering(functionName);
            const result = await this.changeUserDataHelper(userId, newFullName, "fullName");
            this.logExiting(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    changeUserCategories = async (userId, newCategories) => {
        try{
            const functionName = "changeUserCategories";
            this.logEntering(functionName);
            const result = await this.changeUserDataHelper(userId, newCategories, "categories")
            this.logExiting(functionName);
            return result
        }catch(error){
            handleDatabaseError(error);
        }
    }

    changeUserPreferences = async (userId, newPreferences) => {
        try{
            const functionName = "changeUserPreferences";
            this.logEntering(functionName);
            const result = await this.changeUserDataHelper(userId, newPreferences, "preferences")
            this.logExiting(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    
    changeUserEmail = async(userId, newEmail) =>{
        try{
            const functionName = "changeUserEmail";
            this.logEntering(functionName);
            const result = await this.changeUserDataHelper(userId, newEmail, "email")
            this.logExiting(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }
    
    changeUserDataHelper = async(userId, newData, dataField) => {
        try{
            const functionName = "changeUserDataHelper";
            this.logEntering(functionName);
            const result = await user.findByIdAndUpdate({_id:userId}, {[dataField]: newData}, {new:true})
            this.logExiting(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }
    
    deleteUser = async(userId) => {
        try{
            const functionName = "deleteUser";
            this.logEntering(functionName);
            const result = await user.deleteOne({_id:userId})
            this.logExiting(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    getAllUsers = async() => {
        try{
            const functionName = "getAllUsers";
            this.logEntering(functionName);
            const result = await user.find({})
            this.logExiting(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }
    logEntering = (functionName) =>{
        userAccessorLogger.info(`Entering ${functionName} function in userDatabaseManager`);
    }
    logExiting = (functionName) =>{
        userAccessorLogger.info(`Exiting ${functionName} function in userDatabaseManager`);

    }
}
module.exports = userDatabaseManager