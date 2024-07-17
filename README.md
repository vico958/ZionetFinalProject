# ZionetFinalProject 

## About:
This project was developed as a final project for a 2-week course at Zionet Company. The main objective of the project is to create a system where users can sign up to receive news tailored to their interests. The system provides the most interesting and relevant news in the fields the users are interested in.

In this project, I have utilized various technologies including Node.js, Dapr, and more.

## How to Run the Project:
To run this project, follow these steps:

1. Clone the repository to your local machine.

2. Navigate to the root folder, ZionetFinalProject.

3. Run the following command in your command prompt:
```bash
docker-compose up
```
4. Wait for about 2 minutes for the integration tests to run. The tests will check the endpoints of the NewsApp. You should see in the test-runner container that 10 tests have passed. There are 12 tests in total, but 2 have been commented out to prevent blocking of the free email service used in this project.

5. After running the docker-compose up command, you can access the Swagger documentation of NewsApp by visiting localhost:3001/api-docs. Here, you can test the project as you wish.

