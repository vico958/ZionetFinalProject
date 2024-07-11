require("dotenv").config();
const { DaprClient, HttpMethod } = require("@dapr/dapr");

class DaprUserService {
    constructor() {
        this.userDaprHostAndServiceAppId = "user"; // Dapr Sidecar Host
        this.daprPort = "3500"; // Dapr Sidecar Port for user service
        this.userClientDapr = new DaprClient({ userDaprHostAndServiceAppId: this.userDaprHostAndServiceAppId, daprPort: this.daprPort });
        this.userUrlMethodBeggining = "user";
    }

    async registerUserUsingAccessor(userToRegister) {
        try {
            const serviceMethod = `${this.userUrlMethodBeggining}/register`;
            return await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.POST,
                { userToRegister },
                { headers: { 'Content-Type': 'application/json' } },
            );
        } catch (error) {
            console.log(error);
        }
    }

    async userDelete(userToDelete) {
        try {
            const serviceMethod = `${this.userUrlMethodBeggining}/delete-user`;
            return await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.DELETE,
                { userToDelete },
                { headers: { 'Content-Type': 'application/json' } },
            );
        } catch (error) {
            console.log(error);
        }
    }

    async changeCategoriesAndPreferences(userWithNewSettings) {
        try {
            const serviceMethod = `${this.userUrlMethodBeggining}/change-categories-and-preferences`;
            return await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.PUT,
                { userWithNewSettings },
                { headers: { 'Content-Type': 'application/json' } },
            );
        } catch (error) {
            console.log(error);
        }
    }

    async changePreferences(userWithNewPreferences) {
        try {
            const serviceMethod = `${this.userUrlMethodBeggining}/change-preferences`;
            return await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.PUT,
                { userWithNewPreferences },
                { headers: { 'Content-Type': 'application/json' } },
            );
        } catch (error) {
            console.log(error);
        }
    }

    async changePassword(userWithNewPassword) {
        try {
            const serviceMethod = `${this.userUrlMethodBeggining}/change-password`;
            return await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.PUT,
                { userWithNewPassword },
                { headers: { 'Content-Type': 'application/json' } },
            );
        } catch (error) {
            console.log(error);
        }
    }

    async changeEmail(userWithNewEmail) {
        try {
            const serviceMethod = `${this.userUrlMethodBeggining}/change-email`;
            return await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.PUT,
                { userWithNewEmail },
                { headers: { 'Content-Type': 'application/json' } },
            );
        } catch (error) {
            console.log(error);
        }
    }

    async login(userToLogin) {
        try {
            const serviceMethod = `${this.userUrlMethodBeggining}/login`;
            return await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.POST,
                { userToLogin },
                { headers: { 'Content-Type': 'application/json' } },
            );
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    }
}

module.exports = new DaprUserService();
