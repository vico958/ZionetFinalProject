# User Service API

## Overview
The **User Service API** provides functionality for managing users and their preferences in the User service. This includes user registration, login, updating user details, and more.

- **Host:** localhost:3002\
You can go to [localhost:3002\api-docs](http://localhost:3002/api-docs) and test this api with the swagger

## Endpoints

### 1. Register User

- **URL:** `/user/register`
- **Method:** POST
- **Description:** Register a new user with email, password, full name, preferences, and categories.

#### Request Body

```json
{
  "userToRegister": {
    "email": "user@example.com",        
    "password": "passworD123",          
    "fullName": "John Doe",             
    "preferences": ["news", "sports"],  
    "categories": ["technology", "health"] 
  }
}
```
##### Responses
200 OK:\
User registered successfully and a confirmation message sent.

```json
{
  "message": "User registered successfully",
  "data": {
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe",
    "preferences": ["news", "sports"],
    "categories": ["technology", "health"],
    "_id": "60c72b2f9b1e8c1a4d6f2e7b",
    "createdAt": "2021-06-12T19:20:30Z",
    "updatedAt": "2021-06-12T19:20:30Z",
    "__v": 0
  }
}
```

##### Default Error Response:

```json
{
  "message": "Unexpected error",
  "error": "Error details"
}
```

### 2. Login User
- **URL:** `/user/login`
- **Method:** POST
- **Description:** Log in a user with email and password.

Request Body

```json
{
  "userToLogin": {
    "email": "user@example.com",
    "password": "password123"
  }
}
```
##### Responses
200 OK:\
User logged in successfully and the user object is returned.

```json
{
  "message": "User logged in successfully",
  "data": {
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe",
    "preferences": ["news", "sports"],
    "categories": ["technology", "health"],
    "_id": "60c72b2f9b1e8c1a4d6f2e7b",
    "createdAt": "2021-06-12T19:20:30Z",
    "updatedAt": "2021-06-12T19:20:30Z",
    "__v": 0
  }
}
```
##### Default Error Response:

```json
{
  "message": "Unexpected error",
  "error": "Error details"
}
```
### 3. Get All Users
- **URL:** `/user/get-all-users`
- **Method:** GET
- **Description:** Get all registered users.

##### Responses
200 OK:\
Users fetched successfully.

```json
[
  {
    "email": "user@example.com",
    "fullName": "John Doe",
    "preferences": ["news", "sports"],
    "categories": ["technology", "health"]
  },
  ...
]
```
##### Default Error Response:

```json
{
  "message": "Unexpected error",
  "error": "Error details"
}
```

### 4. Change Categories and Preferences
- **URL:** `/user/change-categories-and-preferences`
- **Method:** PUT
- **Description:** Change user categories and preferences.
Request Body
```json
{
  "userWithNewSettings": {
    "email": "user@example.com",
    "password": "password123",
    "newPreferences": ["science", "arts"],
    "newCategories": ["business", "health"]
  }
}
```
##### Responses
200 OK:\
User categories and preferences updated successfully and a confirmation message sent.
```json
{
  "message": "User categories and preferences updated successfully",
  "data": {
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe",
    "preferences": ["science", "arts"],
    "categories": ["business", "health"],
    "_id": "60c72b2f9b1e8c1a4d6f2e7b",
    "createdAt": "2021-06-12T19:20:30Z",
    "updatedAt": "2021-06-12T19:20:30Z",
    "__v": 0
  }
}
```
###### Default Error Response:

```json
{
  "message": "Unexpected error",
  "error": "Error details"
}
```
### 5. Change Preferences
- **URL:** `/user/change-preferences`
- **Method:** PUT
- **Description:** Change user preferences.
Request Body
```json
{
  "userWithNewPreferences": {
    "email": "user@example.com",
    "password": "password123",
    "newPreferences": ["science", "arts"]
  }
}
```
##### Responses
200 OK:\
User preferences updated successfully and a confirmation message sent.
```json
{
  "message": "User preferences updated successfully",
  "data": {
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe",
    "preferences": ["science", "arts"],
    "categories": ["technology", "health"],
    "_id": "60c72b2f9b1e8c1a4d6f2e7b",
    "createdAt": "2021-06-12T19:20:30Z",
    "updatedAt": "2021-06-12T19:20:30Z",
    "__v": 0
  }
}
```
##### Default Error Response:

```json
{
  "message": "Unexpected error",
  "error": "Error details"
}
```
### 6. Change Password
- **URL:** `/user/change-password`
- **Method:** PUT
- **Description:** Change user password.
Request Body
```json
{
  "userWithNewPassword": {
    "email": "user@example.com",
    "newPassword": "newpassword123",
    "oldPassword": "oldpassword123"
  }
}
```
##### Responses
200 OK:\
User password updated successfully and a confirmation message sent.
```json
{
  "message": "User password updated successfully",
  "data": {
    "email": "user@example.com",
    "password": "newpassword123",
    "fullName": "John Doe",
    "preferences": ["news", "sports"],
    "categories": ["technology", "health"],
    "_id": "60c72b2f9b1e8c1a4d6f2e7b",
    "createdAt": "2021-06-12T19:20:30Z",
    "updatedAt": "2021-06-12T19:20:30Z",
    "__v": 0
  }
}
```
##### Default Error Response:

```json
{
  "message": "Unexpected error",
  "error": "Error details"
}
```
### 7. Change Email
- **URL:** `/user/change-email`
- **Method:** PUT
- **Description:** Change user email.
Request Body
```json
{
  "userWithNewEmail": {
    "email": "user@example.com",
    "password": "password123",
    "newEmail": "newuser@example.com"
  }
}
```
##### Responses
200 OK:\
User email updated successfully and a confirmation message sent.
```json
{
  "message": "User email updated successfully",
  "data": {
    "email": "newuser@example.com",
    "password": "password123",
    "fullName": "John Doe",
    "preferences": ["news", "sports"],
    "categories": ["technology", "health"],
    "_id": "60c72b2f9b1e8c1a4d6f2e7b",
    "createdAt": "2021-06-12T19:20:30Z",
    "updatedAt": "2021-06-12T19:20:30Z",
    "__v": 0
  }
}
```
##### Default Error Response:

```json
{
  "message": "Unexpected error",
  "error": "Error details"
}
```
### 8. Delete User
- **URL:** /user/delete-user
- **Method:** DELETE
- **Description:** Delete a user.
Request Body
```json
{
  "userToDelete": {
    "email": "user@example.com",
    "password": "password123"
  }
}
```
##### Responses
200 OK:\
User deleted successfully and a confirmation message sent.
```json
{
  "message": "User deleted successfully",
  "data": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
```
##### Default Error Response:

```json
{
  "message": "Unexpected error",
  "error": "Error details"
}
```
### 9. Health Check
- **URL:** `/user/`
- **Method:** GET
- **Description:** Health check endpoint for the User service.
##### Response
200 OK: Returns "Hello world from User service"
```json
{
  "message": "Hello world from User service"
}
```
### Usage
To use this API, send HTTP requests to the appropriate endpoints. Make sure to include all required parameters in your requests.

### Security
This API handles sensitive user data, including passwords. Implement proper security measures such as rate limiting, input validation, and encryption to protect against potential abuse. Ensure that passwords are stored securely using hashing algorithms like bcrypt.