const { user } = require("../../storages/models/user")
const mongoose = require('mongoose');
const {handleDatabaseError} = require("./errorHandlerDatabaseManger");
const dbUri = 'mongodb://mongoDb:27017/userDb';

mongoose.connect(dbUri, { //TODO: change location of connect and try catch and so ...
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

class userDatabaseManager {
    register = async (userToRegister) => {
        const newUser = new user({
            email:userToRegister.email,
            password:userToRegister.password,
            fullName:userToRegister.fullName,
            preferences:userToRegister.preferences,
            categories:userToRegister.categories
        })
        try{
            const result = await newUser.save()
            return result;
        } catch(error){
            handleDatabaseError(error);
        }
    }

    getUserByEmail = async (email) => {
        try{
            return await user.findOne({email:email});
        }catch(error){
            handleDatabaseError(error);
        }
    }

    
    getUserById = async (userId) => {
        try{
            return await user.findOne({_id:userId});
        }catch(error){
            handleDatabaseError(error);
        }
    }
    
    changePassword = async (userId, newPassword) => {
        try{
            return await this.changeUserDataHelper(userId, newPassword, "password")
        }catch(error){
            handleDatabaseError(error);
        }
    }

    changeFullName = async (userId, newFullName) => {
        try{
            return await this.changeUserDataHelper(userId, newFullName, "fullName");
        }catch(error){
            handleDatabaseError(error);
        }
    }

    changeUserCategories = async (userId, newCategories) => {
        try{
            return await this.changeUserDataHelper(userId, newCategories, "categories")
        }catch(error){
            handleDatabaseError(error);
        }
    }

    changeUserPreferences = async (userId, newPreferences) => {
        try{
            return await this.changeUserDataHelper(userId, newPreferences, "preferences")
        }catch(error){
            handleDatabaseError(error);
        }
    }

    
    changeUserEmail = async(userId, newEmail) =>{
        try{
            return await this.changeUserDataHelper(userId, newEmail, "email")
        }catch(error){
            handleDatabaseError(error);
        }
    }
    
    changeUserDataHelper = async(userId, newData, dataField) => {
        try{
            return await user.findByIdAndUpdate({_id:userId}, {[dataField]: newData}, {new:true})
        }catch(error){
            handleDatabaseError(error);
        }
    }
    
    deleteUser = async(userId) => {
        try{
            return await user.deleteOne({_id:userId})
        }catch(error){
            handleDatabaseError(error);
        }
    }

    getAllUsers = async() => {
        try{
            return await user.find({})
        }catch(error){
            handleDatabaseError(error);
        }
    }
}
module.exports = userDatabaseManager