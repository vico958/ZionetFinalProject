const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { jsonParseTextProperty } = require('./utils');
const { expect } = chai;

describe('Negative Integration Tests', () => {

  before(async () => {
    // Register a user to use in the negative tests
    const userToRegister = {
      email: "testBad@example.com",
      password: "passworD123",
      fullName: "Test Bad User",
      categories: ["environment", "sports"],
      preferences: ["Environmental News", "Sports Updates"]
    };

    await chai.request('http://newsapp:3001')
              .post('/news/register')
              .send({ userToRegister });

    // Register another user to test duplicate email registration
    const anotherUserToRegister = {
      email: "alreadyusedBad@example.com",
      password: "anotherPassword123",
      fullName: "Another Test Bad User",
      categories: ["technology"],
      preferences: ["Tech News"]
    };

    await chai.request('http://newsapp:3001')
              .post('/news/register')
              .send({ anotherUserToRegister });
  });

  it('Should fail to log in with incorrect password', async () => {
    const userToLogin = {
      email: "testBad@example.com",
      password: "wrongPassword"
    };

    const res = await chai.request('http://newsapp:3001')
                          .post('/news/login')
                          .send({ userToLogin });

    expect(res).to.have.status(400);
    const { message } = jsonParseTextProperty(res);
    expect(message).to.equal("Email or password are not valid");
  });

  it('Should fail to register a user with an already used email', async () => {
    const userToRegister = {
      email: "testBad@example.com", // Email already registered in before hook
      password: "anotherPassword123",
      fullName: "Another Test User",
      categories: ["environment", "technology"],
      preferences: ["Tech News", "Environmental Updates"]
    };

    const res = await chai.request('http://newsapp:3001')
                          .post('/news/register')
                          .send({ userToRegister });

    expect(res).to.have.status(400);
    const { message } = jsonParseTextProperty(res);
    expect(message).to.equal("Email already in use");
  });

  it('Should fail to delete a user with incorrect password', async () => {
    const userToDelete = { email: "testBad@example.com", password: "wrongPassword" };

    const res = await chai.request('http://newsapp:3001')
                          .delete('/news/remove-user-from-receiving-news')
                          .send({ user: userToDelete });

    expect(res).to.have.status(400);
    const { message } = jsonParseTextProperty(res);
    expect(message).to.equal("Unable to remove user: email or password are not valid.");
  });

  it('Should fail to change email if new email is already in use', async () => {
    const userWithNewEmail = {
      email: "testBad@example.com", // Current email
      password: "passworD123", // Correct password
      newEmail: "alreadyusedBad@example.com" // Email already registered in before hook
    };

    const res = await chai.request('http://newsapp:3001')
                          .put('/news/change-user-email')
                          .send({ userWithNewEmail });

    expect(res).to.have.status(400);
    const { message } = jsonParseTextProperty(res);
    expect(message).to.equal("Email already in use");
  });

  it('Should fail to change password with incorrect old password', async () => {
    const userWithNewPassword = {
      email: "testBad@example.com",
      oldPassword: "wrongOldPassword",
      newPassword: "newPassworD123"
    };

    const res = await chai.request('http://newsapp:3001')
                          .put('/news/change-password')
                          .send({ userWithNewPassword });

    expect(res).to.have.status(400);
    const { message } = jsonParseTextProperty(res);
    expect(message).to.equal("Password dont match");
  });
});