# NewsData Service API

## Overview
The NewsData Service API provides functionality for fetching news articles based on categories and user preferences, as well as retrieving rules for news categories.

Host: localhost:3004\
You can go to localhost:3004\api-docs and test this api with the swagger

## Endpoints

### 1. Fetch News Articles
- **URL**: `/news-data/get-news`
- **Method**: POST
- **Description**: Fetch news articles based on categories and preferences.

#### Request Body
```json
{
  "categories": ["string"],
  "preferences": ["string"]
}
```
##### Parameters

###### categories:
An array of strings representing categories to filter news articles.
###### preferences:
An array of strings representing user preferences to filter news articles.

#### Response

200 OK:\
News articles fetched successfully.

```json
{
  "status": "string",
  "totalResults": "integer",
  "results": [
    {
      "article_id": "string",
      "title": "string",
      "link": "string (URI)",
      "keywords": ["string"],
      "creator": ["string"],
      "video_url": "string (URI)",
      "description": "string",
      "content": "string",
      "pubDate": "string (date-time)",
      "image_url": "string (URI)",
      "source_id": "string",
      "source_priority": "integer",
      "source_url": "string (URI)",
      "source_icon": "string (URI)",
      "language": "string",
      "country": ["string"],
      "category": ["string"],
      "ai_tag": "string",
      "sentiment": "string",
      "sentiment_stats": "string",
      "ai_region": "string",
      "ai_org": "string"
    }
  ],
  "nextPage": "string"
}
```

### 2. Get Category Rules

- **URL**: `/news-data/categories-rules`
- **Method**: GET
- **Description**: Get the rules for news categories.

#### Response

200 OK:\
Categories rules fetched successfully.

```json
{
  "categoriesAmount": "integer",
  "categoriesList": ["string"]
}
```



### 3. Health Check

- **URL**: `/news-data/`
- **Method**: GET
- **Description**: Health check endpoint for the NewsData service.

#### Response

200 OK:\
Returns "Hello world from news data service"

#### Usage
To use this API, send HTTP requests to the appropriate endpoints. Ensure you include all required parameters in your requests.

#### Security Considerations
While this API doesn't handle sensitive user data directly, consider implementing proper security measures such as rate limiting and input validation to protect against potential abuse.

#### Support
For any issues or questions regarding this API, please contact the development team.
