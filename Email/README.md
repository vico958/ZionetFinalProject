# Email Service API Documentation

## Overview

The **Email Service API** is designed to facilitate the sending of emails with specified details. This API provides an endpoint to send emails and a health check endpoint to ensure the service is running correctly.

## Base URL

The base URL for accessing the Email Service API is:

http://localhost:3006/


## Endpoints

### 1. Send Email

- **Endpoint:** `/email/send-email`
- **Method:** POST
- **Description:** This endpoint allows you to send an email with the specified details.

#### Request Body

The request body should contain the following structure:

```json
{
  "emailInfo": {
    "emailHost": "string",      // The email server host.
    "emailUser": "user@example.com",       // The email account user (must be a valid email).
    "emailPassword": "string",         // The email account password.
    "emailFrom": "user@example.com",      // The sender's email address (must be a valid email).
    "emailTo": "user@example.com",   // The recipient's email address (must be a valid email).
    "emailSubject": "string",          // The subject of the email.
    "emailTextHtml": "string"    // The HTML content of the email.
  }
}
```

Responses
200 OK

Description: Email sent successfully.
Schema:

```json
{
  "message": "string",
  "info": "string"
}
```

Default

Description: Unexpected error.
Schema:

```json
{
  "message": "string",
  "error": "string"
}
```

2. Health Check
Endpoint: /email/
Method: GET
Description: Health check endpoint for the email service.
Responses
200 OK
Description: Hello world from email service
Schema:

```json

{
  "message": "Hello world from email service"
}

```

Usage
To use the Email Service API, you need to send HTTP requests to the specified endpoints with the required parameters and request bodies.

Example: Sending an Email


curl -X POST http://localhost:3006/email/send-email \
  -H "Content-Type: application/json" \
  -d '{
        "emailInfo": {
          "emailHost": "smtp.example.com",
          "emailUser": "user@example.com",
          "emailPassword": "password",
          "emailFrom": "user@example.com",
          "emailTo": "recipient@example.com",
          "emailSubject": "Test Email",
          "emailTextHtml": "<h1>This is a test email</h1>"
        }
      }'


Example: Health Check

curl http://localhost:3006/email/

This will return:

{
  "message": "Hello world from email service"
}


