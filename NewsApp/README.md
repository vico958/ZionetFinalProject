# NewsApp Service

This is the NewsApp Service API for managing users and their news preferences in the NewsApp service.


- **Host:** localhost:3001\
You can go to [localhost:3001\api-docs](http://localhost:3001/api-docs) and test this api with the swagger

## API Endpoints

### 1. Health Check

- **Endpoint:** `/news/`
- **Method:** `GET`
- **Description:** Health check endpoint for the NewsApp service.
- **Response:**
  - `200 OK`: "Hello world from news app"

### 2. Register User

- **Endpoint:** `/news/register`
- **Method:** `POST`
- **Description:** Register a new user with email, password, full name, preferences, and categories.
- **Request Body:**
    ```json
    {
      "userToRegister": {
        "email": "user@example.com",
        "password": "string",
        "fullName": "string",
        "preferences": ["string"],
        "categories": ["string"]
      }
    }
    ```
- **Response:**
  - `200 OK`:\
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
- **Default Error Response:**

```json
{
  "message": "Unexpected error",
  "error": "Error details"
}
```

### 3. Delete User

- **Endpoint:** `/news/remove-user-from-receiving-news`
- **Method:** `DELETE`
- **Description:** Remove a user from receiving news updates.
- **Request Body:**
    ```json
    {
      "user": {
        "email": "string",
        "password": "string"
      }
    }
    ```
- **Response:**
  - `200 OK`:\
  User removed successfully and a confirmation message sent.
```json
{
  "message": "User deleted successfully",
  "data": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
```
  - **Default Error Response:**
```json
{
  "message": "Unexpected error",
  "error": "Error details"
}
```

### 4. Change User Categories and Preferences

- **Endpoint:** `/news/change-user-categories-and-preferences`
- **Method:** `PUT`
- **Description:** Change user categories and preferences.
- **Request Body:**
    ```json
    {
      "userWithNewSettings": {
        "email": "user@example.com",
        "password": "string",
        "newPreferences": ["string"],
        "newCategories": ["string"]
      }
    }
    ```
- **Response:**
  - `200 OK`:\
  User preferences and categories updated successfully and a confirmation message sent.
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
- **Default Error Response:**
```json
{
  "message": "Unexpected error",
  "error": "Error details"
}
```

### 5. Change User Preferences

- **Endpoint:** `/news/change-user-preferences`
- **Method:** `PUT`
- **Description:** Change user preferences.
- **Request Body:**
    ```json
    {
      "userWithNewPreferences": {
        "email": "user@example.com",
        "password": "string",
        "newPreferences": ["string"]
      }
    }
    ```
- **Response:**
  - `200 OK`:\
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
- **Default Error Response:**
```json
{
  "message": "Unexpected error",
  "error": "Error details"
}
```

### 6. Change User Email

- **Endpoint:** `/news/change-user-email`
- **Method:** `PUT`
- **Description:** Change user email.
- **Request Body:**
    ```json
    {
      "userWithNewEmail": {
        "email": "string",
        "password": "string",
        "newEmail": "string"
      }
    }
    ```
- **Response:**
  - `200 OK`:\
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
- **Default Error Response:**
```json
{
  "message": "Unexpected error",
  "error": "Error details"
}
```

### 7. Change User Password

- **Endpoint:** `/news/change-password`
- **Method:** `PUT`
- **Description:** Change user password.
- **Request Body:**
    ```json
    {
      "userWithNewPassword": {
        "email": "string",
        "newPassword": "string",
        "oldPassword": "string"
      }
    }
    ```
- **Response:**
  - `200 OK`:\
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
- **Default Error Response:**
```json
{
  "message": "Unexpected error",
  "error": "Error details"
}
```

### 8. Get News Now

- **Endpoint:** `/news/get-news-now`
- **Method:** `POST`
- **Description:** Get the latest news for a user.
- **Request Body:**
    ```json
    {
      "user": {
        "email": "string",
        "password": "string"
      }
    }
    ```
- **Response:**
  - `200 OK`:\
We received your request. If you are in the system, you will receive news shortly.