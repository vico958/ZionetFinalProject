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
            const check =  await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.POST,
                { userToRegister },
                { headers: { 'Content-Type': 'application/json' } },
            );
            console.log("333333333333333333333333333333333333333333333333333333333333")
            return check;
        } catch (error) {
            console.log("6666666666666666666666666666666666666666666")
            throw error
        }
    }

    async userDelete(userToDelete) {
        try {
            const serviceMethod = `${this.userUrlMethodBeggining}/delete-user`;
            const check = await this.userClientDapr.invoker.invoke(
                this.userDaprHostAndServiceAppId,
                serviceMethod,
                HttpMethod.DELETE,
                { userToDelete },
                { headers: { 'Content-Type': 'application/json' } },
            );
            console.log("777777777777777777777777777")
            return check;
        } catch (error) {
            throw error
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
            throw error
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
            throw error
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
            throw error
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
            throw error
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
