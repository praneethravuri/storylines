# StoryLines API Reference

This document provides a comprehensive guide to the StoryLines API endpoints. The API is organized around three main resources: Stories, Theme Rooms, and Users.

## Table of Contents

1. [Stories Endpoints](#stories-endpoints)
2. [Theme Rooms Endpoints](#theme-rooms-endpoints)
3. [User Endpoints](#user-endpoints)

## Base URL

All URLs referenced in the documentation have the following base:

```
http://localhost:5000/api/v1
```

Replace this with your actual API base URL.

<!-- ## Authentication

Most endpoints require authentication. Include the authentication token in the header of your requests:

```
Authorization: Bearer YOUR_ACCESS_TOKEN
``` -->

## Stories Endpoints

### 1. Create a story

-   **Endpoint:** `/stories`
-   **Method:** POST
-   **Description:** Create a new story
-   **Request Body:**
    ```json
    {
        "title": "Test Title",
        "content": "Test Content",
        "type": "root",
        "authorId": "66a8449eb7c52cb3dec16071",
        "themeRoomId": "66a1f36e7c103e279213e0d3",
        "prev": ["66b1d5686a1b71767abb26eb"]
    }
    ```
-   **Response:** Returns the created story object

### 2. Fetch a single story

-   **Endpoint:** `/stories/{storyId}`
-   **Method:** GET
-   **Description:** Retrieve a single story by ID
-   **Response:** Returns the requested story object

### 3. Fetch all stories

-   **Endpoint:** `/stories`
-   **Method:** GET
-   **Description:** Retrieve all stories
-   **Query Parameters:**
    -   `page` (optional): Page number for pagination
    -   `limit` (optional): Number of stories per page
-   **Response:** Returns an array of story objects

### 4. Fetch all stories of all theme rooms

-   **Endpoint:** `/stories/theme-rooms`
-   **Method:** GET
-   **Description:** Retrieve all stories associated with all theme rooms
-   **Response:** Returns an array of story objects grouped by theme room

### 5. Fetch all stories of a single theme room

-   **Endpoint:** `/stories/theme-rooms/{themeRoomId}`
-   **Method:** GET
-   **Description:** Retrieve all stories of a specific theme room
-   **Response:** Returns an array of story objects for the specified theme room

### 6. Fetch all stories written by a particular author

-   **Endpoint:** `/stories/authors/{authorId}`
-   **Method:** GET
-   **Description:** Retrieve all stories written by a particular author
-   **Response:** Returns an array of story objects by the specified author

### 7. Fetch all favorite stories of the user

-   **Endpoint:** `/stories/users/{userId}/favorites`
-   **Method:** GET
-   **Description:** Retrieve all stories marked as favorites by the user
-   **Response:** Returns an array of favorite story objects for the specified user

### 8. Delete a story

-   **Endpoint:** `/stories/{storyId}`
-   **Method:** DELETE
-   **Description:** Delete a story
-   **Response:** Returns a success message

### 9. Update a story

-   **Endpoint:** `/stories/{storyId}`
-   **Method:** PUT / PATCH
-   **Description:** Edit or update a story
-   **Request Body:**
    ```json
    {
        "title": "Updated Story Title",
        "content": "Updated story content..."
    }
    ```
-   **Response:** Returns the updated story object

### 10. Add a story to user's favorite story list

-   **Endpoint:** `/stories/{storyId}/favorite`
-   **Method:** POST
-   **Description:** Add a story to the user's favorite story list
-   **Response:** Returns a success message

### 11. Remove a story from user's favorite story list

-   **Endpoint:** `/stories/{storyId}/favorite`
-   **Method:** DELETE
-   **Description:** Remove a story from the user's favorite story list
-   **Response:** Returns a success message

## Theme Rooms Endpoints

### 1. Create a theme room

-   **Endpoint:** `/theme-rooms`
-   **Method:** POST
-   **Description:** Create a new theme room
-   **Request Body:**
    ```json
    {
        "name": "Formula 2",
        "description": "Welcome to the high-octane world of Formula 1!",
        "tags": [
            "motorsport",
            "Formula 1",
            "racing"
        ]
    }
    ```
-   **Response:** Returns the created theme room object

### 2. Fetch all theme rooms

-   **Endpoint:** `/theme-rooms`
-   **Method:** GET
-   **Description:** Retrieve all theme rooms
-   **Response:** Returns an array of theme room objects

### 3. Fetch a single theme room

-   **Endpoint:** `/theme-rooms/{themeRoomId}`
-   **Method:** GET
-   **Description:** Retrieve a single theme room by its ID
-   **Response:** Returns the requested theme room object

### 4. Fetch favorite theme rooms of a user

-   **Endpoint:** `/theme-rooms/users/{userId}/favorites`
-   **Method:** GET
-   **Description:** Retrieve all favorite theme rooms of a specified user
-   **Response:** Returns an array of favorite theme room objects for the specified user

### 5. Update a theme room

-   **Endpoint:** `/theme-rooms/{themeRoomId}`
-   **Method:** PUT / PATCH
-   **Description:** Update an existing theme room
-   **Request Body:**
    ```json
    {
        "name": "Updated Theme Room Name",
        "description": "Updated theme room description...",
        "tags" : ["tag1", "tag2", "tag2"]
    }
    ```
-   **Response:** Returns the updated theme room object

### 6. Delete a theme room

-   **Endpoint:** `/theme-rooms/{themeRoomId}`
-   **Method:** DELETE
-   **Description:** Delete a specific theme room
-   **Response:** Returns a success message

### 7. Add a theme room to user's favorites

-   **Endpoint:** `/theme-rooms/{themeRoomId}/favorite`
-   **Method:** POST
-   **Description:** Add a theme room to the current user's favorites
-   **Response:** Returns a success message

### 8. Remove a theme room from user's favorites

-   **Endpoint:** `/theme-rooms/{themeRoomId}/favorite`
-   **Method:** DELETE
-   **Description:** Remove a theme room from the current user's favorites
-   **Response:** Returns a success message

### 9. Search theme rooms

-   **Endpoint:** `/theme-rooms/search`
-   **Method:** GET
-   **Description:** Search for theme rooms based on various criteria
-   **Query Parameters:**
    -   `q` (required): Search query string
    -   `tags` (optional): Comma-separated list of tags
-   **Response:** Returns an array of matching theme room objects

## User Endpoints

### 1. Create a user

-   **Endpoint:** `/users`
-   **Method:** POST
-   **Description:** Create a new user
-   **Request Body:**
    ```json
    {
        "username": "newuser",
        "email": "user@example.com",
        "password": "securepassword"
    }
    ```
-   **Response:** Returns the created user object (excluding password)

### 2. Fetch all users

-   **Endpoint:** `/users`
-   **Method:** GET
-   **Description:** Retrieve all users
-   **Response:** Returns an array of user objects

### 3. Fetch a single user

-   **Endpoint:** `/users/{userId}`
-   **Method:** GET
-   **Description:** Retrieve a single user by their ID
-   **Response:** Returns the requested user object

### 4. Update a user

-   **Endpoint:** `/users/{userId}`
-   **Method:** PUT / PATCH
-   **Description:** Update an existing user's information
-   **Request Body:**
    ```json
    {
        "username": "updatedusername",
        "email": "updateduser@example.com"
    }
    ```
-   **Response:** Returns the updated user object

### 5. Delete a user

-   **Endpoint:** `/users/{userId}`
-   **Method:** DELETE
-   **Description:** Delete a specific user
-   **Response:** Returns a success message

### 6. User login

-   **Endpoint:** `/users/login`
-   **Method:** POST
-   **Description:** Authenticate a user and return a token
-   **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "userpassword"
    }
    ```
-   **Response:** Returns an authentication token

### 7. User logout

-   **Endpoint:** `/users/logout`
-   **Method:** POST
-   **Description:** Log out the current user (invalidate token)
-   **Response:** Returns a success message

### 8. Get user's stories

-   **Endpoint:** `/users/{userId}/stories`
-   **Method:** GET
-   **Description:** Retrieve all stories written by a specific user
-   **Response:** Returns an array of story objects written by the specified user

### 9. Get user's favorite stories

-   **Endpoint:** `/users/{userId}/favorite-stories`
-   **Method:** GET
-   **Description:** Retrieve all stories favorited by a specific user
-   **Response:** Returns an array of favorite story objects for the specified user

### 10. Get user's favorite theme rooms

-   **Endpoint:** `/users/{userId}/favorite-theme-rooms`
-   **Method:** GET
-   **Description:** Retrieve all theme rooms favorited by a specific user
-   **Response:** Returns an array of favorite theme room objects for the specified user

## Error Handling

The API uses conventional HTTP response codes to indicate the success or failure of an API request. In general:

-   2xx range indicate success
-   4xx range indicate an error that failed given the information provided (e.g., a required parameter was omitted, etc.)
-   5xx range indicate an error with our servers

For more detailed error information, refer to the error message in the response body.

## Rate Limiting

API calls are subject to rate limiting. The current limits are:

-   1000 requests per hour
-   10,000 requests per day

If you exceed these limits, you'll receive a 429 Too Many Requests response.

## Changelog

-   **v1.0.0** (2024-08-14): Initial release of the API

<!-- For any questions or issues, please contact our developer support at dev-support@storylines.com. -->
