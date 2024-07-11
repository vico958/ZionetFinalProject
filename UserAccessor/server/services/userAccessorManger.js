const userDatabaseManager = require("./userAccessorDatabaseManger")

class userAccessorManger{
    constructor(){
        this.userDatabase = new userDatabaseManager();
    }

    async register (userToRegister) {
        try{
            return await this.userDatabase.register(userToRegister);
        }catch(error){
            console.log(error);
        }
    }

    async getUserByEmail (email) {
        try{
            return await this.userDatabase.getUserByEmail(email);
        }catch(error){
            console.log(error)
        }
    }

    
    async getUserById(userId) {
        try{
            return await this.userDatabase.getUserById(userId);
        }catch(error){
            console.log(error)
        }
    }
    
    async changePassword(userId, newPassword){
        try{
            return await this.userDatabase.changePassword(userId, newPassword)
        }catch(error){
            console.log(error)
        }
    }

    async changeFullName(userId, newFullName){
        try{
            return await this.userDatabase.changeFullName(userId, newFullName)
        }catch(error){
            console.log(error)
        }
    }
    
    async changeUserCategories(userId, newCategories){
        try{
            return await this.userDatabase.changeUserCategories(userId, newCategories);
        }catch(error){
            console.log(error)
        }
    }

    async changeUserPreferences(userId, newPreferences){
        try{
            return await this.userDatabase.changeUserPreferences(userId, newPreferences);
        }catch(error){
            console.log(error);
        }
    }

    async changeUserEmail(userId, newEmail){
        try{
            return await this.userDatabase.changeUserEmail(userId, newEmail);
        }catch(error){
            console.log(error);
        }
    }

    async deleteUser(userId){
        try{
            return await this.userDatabase.deleteUser(userId)
        }catch(error){
            console.log(error);
        }
    }

    async getAllUsers(){
        try{
            return await this.userDatabase.getAllUsers()
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = new userAccessorManger();