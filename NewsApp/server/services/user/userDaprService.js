require("dotenv").config();
const { DaprClient, HttpMethod } = require("@dapr/dapr");
const newsAppLogger = require("../logger/logger");
class DaprUserService {
    constructor() {
        this.userDaprHostAndServiceAppId = "user"; // Dapr Sidecar Host
        this.daprPort = "3500"; // Dapr Sidecar Port for user service
        this.userClientDapr = new DaprClient({ userDaprHostAndServiceAppId: this.userDaprHostAndServiceAppId, daprPort: this.daprPort });
        this.userUrlMethodBeggining = "user";
    }

    async registerUserUsingAccessor(userToRegister) {
        try {
            newsAppLogger.info("Register user using accessor in class DaprUserService event")
            const serviceMethod = `${this.userUrlMethodBeggining}/register`;
            return  await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.POST,
                { userToRegister },
                { headers: { 'Content-Type': 'application/json' } },
            );
        } catch (error) {
            throw error
        }
    }

    async userDelete(userToDelete) {
        try {
            newsAppLogger.info("User delete in class DaprUserService event")
            const serviceMethod = `${this.userUrlMethodBeggining}/delete-user`;
            return await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.DELETE,
                { userToDelete },
                { headers: { 'Content-Type': 'application/json' } },
            );
        } catch (error) {
            throw error
        }
    }

    async changeCategoriesAndPreferences(userWithNewSettings) {
        try {
            newsAppLogger.info("Change categories and preferences in class DaprUserService event")
            const serviceMethod = `${this.userUrlMethodBeggining}/change-categories-and-preferences`;
            return await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.PUT,
                { userWithNewSettings },
                { headers: { 'Content-Type': 'application/json' } },
            );
        } catch (error) {
            throw error
        }
    }

    async changePreferences(userWithNewPreferences) {
        try {
            newsAppLogger.info("Change preferences in class DaprUserService event")
            const serviceMethod = `${this.userUrlMethodBeggining}/change-preferences`;
            return await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.PUT,
                { userWithNewPreferences },
                { headers: { 'Content-Type': 'application/json' } },
            );
        } catch (error) {
            throw error
        }
    }

    async changePassword(userWithNewPassword) {
        try {
            newsAppLogger.info("Change password in class DaprUserService event")
            const serviceMethod = `${this.userUrlMethodBeggining}/change-password`;
            return await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.PUT,
                { userWithNewPassword },
                { headers: { 'Content-Type': 'application/json' } },
            );
        } catch (error) {
            throw error
        }
    }

    async changeEmail(userWithNewEmail) {
        try {
            newsAppLogger.info("Change email in class DaprUserService event")
            const serviceMethod = `${this.userUrlMethodBeggining}/change-email`;
            return await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.PUT,
                { userWithNewEmail },
                { headers: { 'Content-Type': 'application/json' } },
            );
        } catch (error) {
            throw error
        }
    }

    async login(userToLogin) {
        try {
            newsAppLogger.info("Login in class DaprUserService event")
            const serviceMethod = `${this.userUrlMethodBeggining}/login`;
            return await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.POST,
                { userToLogin },
                { headers: { 'Content-Type': 'application/json' } },
            );
        } catch (error) {
            throw error
        }
    }

    async getAllUsersInSystem() {
        try {
            newsAppLogger.info("Get all users in system in class DaprUserService event")
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
