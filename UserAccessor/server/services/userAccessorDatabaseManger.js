const { user } = require("../storages/models/user")
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
            console.log("shame", error)
        }
    }

    getUserByEmail = async (email) => {
        try{
            return await user.findOne({email:email});
        }catch(error){
            console.log(error);
        }
    }

    
    getUserById = async (userId) => {
        try{
            return await user.findOne({_id:userId});
        }catch(error){
            console.log(error);
        }
    }
    
    changePassword = async (userId, newPassword) => {
        try{
            return await changeUserDataHelper(userId, newPassword, "password")
        }catch(error){
            console.log(error)
        }
    }

    changeFullName = async (userId, newFullName) => {
        try{
            return await changeUserDataHelper(userId, newFullName, "fullName");
        }catch(error){
            console.log(error)
        }
    }

    changeUserCategories = async (userId, newCategories) => {
        try{
            return await changeUserDataHelper(userId, newCategories, "categories")
        }catch(error){
            console.log(error);
        }
    }

    changeUserPreferences = async (userId, newPreferences) => {
        try{
            return await changeUserDataHelper(userId, newPreferences, "preferences")
        }catch(error){
            console.log(error)
        }
    }

    changeUserDataHelper = async(userId, newData, dataField) => {
        try{
            return await user.findByIdAndUpdate({_id:userId}, {[dataField]: newData}, {new:true})
        }catch(error){
            console.log(error)
        }
    }

    changeUserEmail = async(userId, newEmail) =>{
        try{
            return await changeUserDataHelper(userId, newEmail, "email")
        }catch(error){
            console.log(error)
        }
    }

    deleteUser = async(userId) => {
        try{
            return await user.deleteOne({_id:userId})
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = userDatabaseManager