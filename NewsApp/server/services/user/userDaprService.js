require("dotenv").config();
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const {sendRequestWithDaprHelper} = require("../general")
class DaprUserService {
    constructor() {
        this.userDaprHostAndServiceAppId = "user"; // Dapr Sidecar Host
        this.daprPort = "3500"; // Dapr Sidecar Port for user service
        this.userClientDapr = new DaprClient({ userDaprHostAndServiceAppId: this.userDaprHostAndServiceAppId, daprPort: this.daprPort });
        this.userUrlMethodBeggining = "user";
    }

    async registerUserUsingAccessor(userToRegister) {
        try {
            const urlEnding = "register";
            return await sendRequestWithDaprHelper(userToRegister, HttpMethod.POST, this.userUrlMethodBeggining, urlEnding, this.userClientDapr, userDaprHostAndServiceAppId);
        } catch (error) {
            throw error
        }
    }

    async userDelete(userToDelete) {
        try {
            const urlEnding = "delete-user";
            return await sendRequestWithDaprHelper(userToDelete, HttpMethod.DELETE, this.userUrlMethodBeggining, urlEnding, this.userClientDapr, userDaprHostAndServiceAppId);
        } catch (error) {
            throw error
        }
    }

    async changeCategoriesAndPreferences(userWithNewSettings) {
        try {
            const urlEnding = "change-categories-and-preferences";
            return await sendRequestWithDaprHelper(userWithNewSettings, HttpMethod.PUT, this.userUrlMethodBeggining, urlEnding, this.userClientDapr, userDaprHostAndServiceAppId);
        } catch (error) {
            throw error
        }
    }

    async changePreferences(userWithNewPreferences) {
        try {
            const urlEnding = "change-preferences";
            return await sendRequestWithDaprHelper(userWithNewPreferences, HttpMethod.PUT, this.userUrlMethodBeggining, urlEnding, this.userClientDapr, userDaprHostAndServiceAppId);
        } catch (error) {
            throw error
        }
    }

    async changePassword(userWithNewPassword) {
        try {
            const urlEnding = "change-password";
            return await sendRequestWithDaprHelper(userWithNewPassword, HttpMethod.PUT, this.userUrlMethodBeggining, urlEnding, this.userClientDapr, userDaprHostAndServiceAppId);
        } catch (error) {
            throw error
        }
    }

    async changeEmail(userWithNewEmail) {
        try {
            const urlEnding = "change-email";
            return await sendRequestWithDaprHelper(userWithNewEmail, HttpMethod.PUT, this.userUrlMethodBeggining, urlEnding, this.userClientDapr, userDaprHostAndServiceAppId);
        } catch (error) {
            throw error
        }
    }

    async login(userToLogin) {
        try {
            const urlEnding = "login";
            return await sendRequestWithDaprHelper(userToLogin, HttpMethod.POST, this.userUrlMethodBeggining, urlEnding, this.userClientDapr, userDaprHostAndServiceAppId);
        } catch (error) {
            throw error
        }
    }

    async getAllUsersInSystem() {
        try {
            const serviceMethod = `${this.userUrlMethodBeggining}/get-all-users`;
            return await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.GET,
            );
        } catch (error) {
            throw error
        }
    }
}

module.exports = new DaprUserService();
