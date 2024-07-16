# NewsAi Service API

## Overview
This API provides functionality for determining the best articles based on user preferences. It is designed to help filter and personalize news content for users.

Host: localhost:3005\
You can go to [localhost:3005\api-docs](http://localhost:3005/api-docs) and test this api with the swagger
## Endpoints

### 1. Get Best Articles
- **Endpoint**: `/news-ai/best-articles`
- **Method**: POST
- **Description**: Get the best articles based on user preferences.

#### Request Body
```json
{
  "preferences": ["string"],
  "articles": [
    {
      "title": "string",
      "link": "string"
    }
  ]
}

```

#### Parameters

##### preferences:
An array of strings representing user preferences to filter the best articles.
##### articles:
An array of article objects to be evaluated, each containing:
###### title:
The title of the article.
###### link:
The link to the article.



#### Responses

200 OK:\
Best articles based on preferences
```json
[
  {
    "title": "string",
    "link": "string",
    "summary": "string"
  }
]
```
#### Default Error Response:

```json
{
  "message": "string",
  "error": "string"
}
```

### 2. Health Check

- **Endpoint**: `/news-ai/`
- **Method**: GET
- **Description**: Health check endpoint for the NewsAi service.

#### Response

200 OK:\
Returns "Hello world from news ai service"

#### Usage
To use this API, send HTTP requests to the appropriate endpoints. Make sure to include all required parameters in your requests.
For the best articles endpoint:

Prepare a list of user preferences.\
Gather a list of articles with their titles and links.\
Send a POST request to /news-ai/best-articles with the preferences and articles in the request body.\
The API will return a list of the best articles, including summaries, based on the provided preferences.

 #### Security
While this API doesn't handle sensitive user data directly, consider implementing proper security measures such as rate limiting and input validation to protect against potential abuse.
#### Support
For any issues or questions regarding this API, please contact the development team.