# Email Service API

## Overview
This API provides functionality for sending emails. It is designed to be a simple yet effective service for integrating email capabilities into your applications.


## Endpoints

### 1. Send Email
- **URL**: `/email/send-email`
- **Method**: POST
- **Description**: Send an email with the specified details.

#### Request Body
```json
{
  "emailInfo": {
    "emailHost": "string",
    "emailUser": "string (email)",
    "emailPassword": "string",
    "emailFrom": "string (email)",
    "emailTo": "string (email)",
    "emailSubject": "string",
    "emailTextHtml": "string"
  }
}
```
#### Parameters

emailHost: The email server host.\
emailUser: The email account user.\
emailPassword: The email account password.\
emailFrom: The sender's email address.\
emailTo: The recipient's email address.\
emailSubject: The subject of the email.\
emailTextHtml: The HTML content of the email.\

###### Responses

200 OK:\ Email sent successfully

```json
{
  "message": "string",
  "info": "string"
}

```

#### Default Error Response:


```json

{
  "message": "string",
  "error": "string"
}

```

### 2. Health Check

URL: /email/\
Method: GET\
Description: Health check endpoint for the email service.

###### Response

200 OK:\ Returns "Hello world from email service"

#### Usage
To use this API, send HTTP requests to the appropriate endpoints. Make sure to include all required parameters in your requests.
Security
Please note that this API handles sensitive information such as email passwords. Ensure that you implement proper security measures when using this API.\
For any issues or questions regarding this API, please contact the development team.
