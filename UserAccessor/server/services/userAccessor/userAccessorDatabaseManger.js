const { user } = require("../../storages/models/user")
const mongoose = require('mongoose');
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
            throw error
        }
    }

    getUserByEmail = async (email) => {
        try{
            return await user.findOne({email:email});
        }catch(error){
            throw error
        }
    }

    
    getUserById = async (userId) => {
        try{
            return await user.findOne({_id:userId});
        }catch(error){
            throw error
        }
    }
    
    changePassword = async (userId, newPassword) => {
        try{
            return await changeUserDataHelper(userId, newPassword, "password")
        }catch(error){
            throw error
        }
    }

    changeFullName = async (userId, newFullName) => {
        try{
            return await changeUserDataHelper(userId, newFullName, "fullName");
        }catch(error){
            throw error
        }
    }

    changeUserCategories = async (userId, newCategories) => {
        try{
            return await changeUserDataHelper(userId, newCategories, "categories")
        }catch(error){
            throw error
        }
    }

    changeUserPreferences = async (userId, newPreferences) => {
        try{
            return await changeUserDataHelper(userId, newPreferences, "preferences")
        }catch(error){
            throw error
        }
    }

    changeUserDataHelper = async(userId, newData, dataField) => {
        try{
            return await user.findByIdAndUpdate({_id:userId}, {[dataField]: newData}, {new:true})
        }catch(error){
            throw error
        }
    }

    changeUserEmail = async(userId, newEmail) =>{
        try{
            return await changeUserDataHelper(userId, newEmail, "email")
        }catch(error){
            throw error
        }
    }

    deleteUser = async(userId) => {
        try{
            return await user.deleteOne({_id:userId})
        }catch(error){
            throw error
        }
    }

    getAllUsers = async() => {
        try{
            return await user.find({})
        }catch(error){
            throw error
        }
    }
}
module.exports = userDatabaseManager