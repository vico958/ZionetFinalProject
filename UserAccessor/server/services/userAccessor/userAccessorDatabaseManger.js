const { user } = require("../../storages/models/user")
const mongoose = require('mongoose');
const {handleDatabaseError} = require("./errorHandlerDatabaseManger");
const { logEnteringFunction, logExitingFunction} = require("../general");
const dbUri = 'mongodb://mongoDb:27017/userDb';

mongoose.connect(dbUri, { //TODO: change location of connect and try catch and so ...
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

class userDatabaseManager {
    register = async (userToRegister) => {
        const functionName = "register";
        logEnteringFunction(functionName);
        const newUser = new user({
            email:userToRegister.email,
            password:userToRegister.password,
            fullName:userToRegister.fullName,
            preferences:userToRegister.preferences,
            categories:userToRegister.categories
        })
        try{
            const result = await newUser.save()
            logExitingFunction(functionName); // TODO: to check work
            return result;
        } catch(error){
            handleDatabaseError(error);
        }
    }

    getUserByEmail = async (email) => {
        try{
            const functionName = "getUserByEmail";
            logEnteringFunction(functionName);
            const result = await user.findOne({email:email});
            logExitingFunction(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    
    getUserById = async (userId) => {
        try{
            const functionName = "getUserById";
            logEnteringFunction(functionName);
            const result = await user.findOne({_id:userId});
            logExitingFunction(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }
    
    changePassword = async (userId, newPassword) => {
        try{
            const functionName = "changePassword";
            logEnteringFunction(functionName);
            const result = await this.changeUserDataHelper(userId, newPassword, "password")
            logExitingFunction(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    changeFullName = async (userId, newFullName) => {
        try{
            const functionName = "changeFullName";
            logEnteringFunction(functionName);
            const result = await this.changeUserDataHelper(userId, newFullName, "fullName");
            logExitingFunction(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    changeUserCategories = async (userId, newCategories) => {
        try{
            const functionName = "changeUserCategories";
            logEnteringFunction(functionName);
            const result = await this.changeUserDataHelper(userId, newCategories, "categories")
            logExitingFunction(functionName);
            return result
        }catch(error){
            handleDatabaseError(error);
        }
    }

    changeUserPreferences = async (userId, newPreferences) => {
        try{
            const functionName = "changeUserPreferences";
            logEnteringFunction(functionName);
            const result = await this.changeUserDataHelper(userId, newPreferences, "preferences")
            logExitingFunction(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    
    changeUserEmail = async(userId, newEmail) =>{
        try{
            const functionName = "changeUserEmail";
            logEnteringFunction(functionName);
            const result = await this.changeUserDataHelper(userId, newEmail, "email")
            logExitingFunction(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }
    
    changeUserDataHelper = async(userId, newData, dataField) => {
        try{
            const functionName = "changeUserDataHelper";
            logEnteringFunction(functionName);
            const result = await user.findByIdAndUpdate({_id:userId}, {[dataField]: newData}, {new:true})
            logExitingFunction(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }
    
    deleteUser = async(userId) => {
        try{
            const functionName = "deleteUser";
            logEnteringFunction(functionName);
            const result = await user.deleteOne({_id:userId})
            logExitingFunction(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }

    getAllUsers = async() => {
        try{
            const functionName = "getAllUsers";
            logEnteringFunction(functionName);
            const result = await user.find({})
            logExitingFunction(functionName);
            return result;
        }catch(error){
            handleDatabaseError(error);
        }
    }
}
module.exports = userDatabaseManager