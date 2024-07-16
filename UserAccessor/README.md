# UserAccessor Service API

## Overview
The UserAccessor Service API provides endpoints for managing users and their preferences. It includes functionalities for user registration, login, fetching all users, and updating user details such as preferences, categories, passwords, and emails. Additionally, it provides endpoints for deleting users and a health check.

- **Host:** localhost:3003\
You can go to [localhost:3003\api-docs](http://localhost:3003/api-docs) and test this api with the swagger

## Endpoints
### 1. Register a New User
- **Endpoint:** `/user-accessor/register`
- **Method:** POST
- **Description:** Register a new user with email, password, full name, preferences, and categories.

Request Body
```json
{
  "userToRegister": {
    "email": "string",
    "password": "string",
    "fullName": "string",
    "preferences": ["string"],
    "categories": ["string"]
  }
}

```
##### Responses
200 OK
```json
{
  "message": "string",
  "data": {
    "email": "string",
    "password": "string",
    "fullName": "string",
    "preferences": ["string"],
    "categories": ["string"],
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
}
```
##### Default Error

```json
{
  "message": "string",
  "error": "string"
}
```
### 2. Log In a User
- **Endpoint:** /user-accessor/login
- **Method:** POST
- **Description:** Log in a user with email and password.

Request Body
```json
{
  "userToLogin": {
    "email": "string",
    "password": "string"
  }
}
```
Responses
200 OK
```json
{
  "message": "string",
  "data": {
    "email": "string",
    "password": "string",
    "fullName": "string",
    "preferences": ["string"],
    "categories": ["string"],
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
}
```
Default Error

```json
{
  "message": "string",
  "error": "string"
}
```
3. Get All Users
- **URL:** `/user/register`
- **Method:** POST
- **Description:**
Endpoint: /user-accessor/get-all-users
Method: GET
Description: Get all registered users.

Responses
200 OK
```json
{
  "message": "string",
  "data": [
    {
      "email": "string",
      "fullName": "string",
      "preferences": ["string"],
      "categories": ["string"]
    }
  ]
}
```
Default Error

```json
{
  "message": "string",
  "error": "string"
}
```
4. Change User Categories and Preferences
- **URL:** `/user/register`
- **Method:** POST
- **Description:**
Endpoint: /user-accessor/change-categories-and-preferences
Method: PUT
Description: Change user categories and preferences.

Request Body
```json
{
  "userWithNewSettings": {
    "email": "string",
    "password": "string",
    "newPreferences": ["string"],
    "newCategories": ["string"]
  }
}
```
Responses
200 OK
```json
{
  "message": "string",
  "data": {
    "email": "string",
    "password": "string",
    "fullName": "string",
    "preferences": ["string"],
    "categories": ["string"],
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
}
```
Default Error

```json
{
  "message": "string",
  "error": "string"
}
```
5. Change User Preferences
- **URL:** `/user/register`
- **Method:** POST
- **Description:**
Endpoint: /user-accessor/change-preferences
Method: PUT
Description: Change user preferences.

Request Body
```json
{
  "userWithNewPreferences": {
    "email": "string",
    "password": "string",
    "newPreferences": ["string"]
  }
}
```
Responses
200 OK
```json
{
  "message": "string",
  "data": {
    "email": "string",
    "password": "string",
    "fullName": "string",
    "preferences": ["string"],
    "categories": ["string"],
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
}
```
Default Error

```json
{
  "message": "string",
  "error": "string"
}
```

6. Change User Password
- **URL:** `/user/register`
- **Method:** POST
- **Description:**
Endpoint: /user-accessor/change-password
Method: PUT
Description: Change user password.

Request Body
```json
{
  "userWithNewPassword": {
    "email": "string",
    "newPassword": "string",
    "oldPassword": "string"
  }
}
```
Responses
200 OK
```json
{
  "message": "string",
  "data": {
    "email": "string",
    "password": "string",
    "fullName": "string",
    "preferences": ["string"],
    "categories": ["string"],
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
}
```
Default Error

```json
{
  "message": "string",
  "error": "string"
}
```
7. Change User Email
- **URL:** `/user/register`
- **Method:** POST
- **Description:**
Endpoint: /user-accessor/change-email
Method: PUT
Description: Change user email.

Request Body
```json
{
  "userWithNewEmail": {
    "email": "string",
    "password": "string",
    "newEmail": "string"
  }
}
```
Responses
200 OK
```json
{
  "message": "string",
  "data": {
    "email": "string",
    "password": "string",
    "fullName": "string",
    "preferences": ["string"],
    "categories": ["string"],
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
}
```
Default Error

```json
{
  "message": "string",
  "error": "string"
}
```
8. Delete a User
- **URL:** `/user/register`
- **Method:** POST
- **Description:**
Endpoint: /user-accessor/delete-user
Method: DELETE
Description: Delete a user.

Request Body
```json
{
  "userToDelete": {
    "email": "string",
    "password": "string"
  }
}
```
Responses
200 OK
```json
{
  "message": "string",
  "data": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
```
Default Error

```json
{
  "message": "string",
  "error": "string"
}
```
9. Health Check
- **URL:** `/user/register`
- **Method:** POST
- **Description:**
Endpoint: /user-accessor/
Method: GET
Description: Health check endpoint for the UserAccessor service.

Responses
200 OK
```json
"Hello world from user accessor service"
```

This README file provides an overview of the UserAccessor Service API, including the base URL and detailed descriptions of each endpoint, their request bodies, and possible responses. This documentation is intended to help developers understand and use the API effectively.