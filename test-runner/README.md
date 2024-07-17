# NewsApp Integration Tests

## Overview

This repository contains integration tests for the NewsApp service, designed to ensure the correct functionality of various user-related endpoints. The tests are written using Mocha, Chai, and Chai HTTP, and they cover both positive and negative scenarios for user registration, login, and preference management.

## Running the Tests

The tests are designed to run automatically when the project starts using Docker Compose.

the tests will run 2 minutes after you do docker-compose up.

There is no need to run `npm test` manually, as the tests will execute automatically as part of the Docker Compose setup.

## Test Descriptions

### Positive Integration Tests

#### User Registration
- **Test Case:** Should register a new user and send a confirmation message
- **Endpoint:** `POST /news/register`
- **Description:** This test registers a new user and verifies the response to ensure the user data is correctly returned.

#### Change Categories and Preferences
- **Test Case:** Should change user categories and preferences and return the updated data
- **Endpoint:** `PUT /news/change-user-categories-and-preferences`
- **Description:** This test updates the user's categories and preferences and checks the response to ensure the changes are correctly applied.

#### Change Preferences
- **Test Case:** Should change user preferences and return the updated data
- **Endpoint:** `PUT /news/change-user-preferences`
- **Description:** This test updates the user's preferences and verifies the response to ensure the changes are correctly applied.

#### Change Email
- **Test Case:** Should change user email and return the updated data
- **Endpoint:** `PUT /news/change-user-email`
- **Description:** This test updates the user's email and checks the response to ensure the changes are correctly applied.

#### Change Password
- **Test Case:** Should change user password and return a confirmation message
- **Endpoint:** `PUT /news/change-password`
- **Description:** This test updates the user's password and verifies the response to ensure the change is correctly applied.

#### User Deletion
- **Test Case:** Should delete an existing user and send a confirmation message
- **Endpoint:** `DELETE /news/remove-user-from-receiving-news`
- **Description:** This test deletes a user and checks the response to ensure the user is successfully removed.

#### Hello World Check
- **Test Case:** Should respond with "Hello world from news app"
- **Endpoint:** `GET /news`
- **Description:** This test checks the health endpoint to ensure the service is running.

### Negative Integration Tests

#### User Registration with Existing Email
- **Test Case:** Should fail to register a user with an already used email
- **Endpoint:** `POST /news/register`
- **Description:** This test attempts to register a user with an email that is already in use and verifies that the appropriate error message is returned.

#### User Deletion with Incorrect Password
- **Test Case:** Should fail to delete a user with incorrect password
- **Endpoint:** `DELETE /news/remove-user-from-receiving-news`
- **Description:** This test attempts to delete a user with an incorrect password and checks that the appropriate error message is returned.

#### Change Password with Incorrect Old Password
- **Test Case:** Should fail to change password with incorrect old password
- **Endpoint:** `PUT /news/change-password`
- **Description:** This test attempts to change a user's password with an incorrect old password and verifies that the appropriate error message is returned.

## Note

Some tests have been commented out due to limitations with the current email service. These tests will be activated once a paid email service is set up.

## Functionality

The tests in this service are designed to run automatically when the project starts using Docker Compose. This ensures the integrity of the user-related functionalities in the NewsApp, providing a robust testing framework for ongoing development.

This README provides an overview of the integration tests included in the repository, detailing the positive and negative test cases, installation instructions, and execution guidelines. The tests ensure the reliability and correctness of the NewsApp's user management functionalities.
