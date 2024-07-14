const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

describe('Integration Test - User Registration', () => {
  it('Should register a new user and send a confirmation message', async () => {
    const userToRegister = {
      email: "test@example.com",
      password: "passworD123",
      fullName: "Test User",
      categories: ["environment", "sports"],
      preferences: ["Environmental News", "Sports Updates"]
    };

    const res = await chai.request('http://newsapp:3001')
                          .post('/news/register')
                          .send({ userToRegister });
    const { data, message } = jsonParseTextProperty(res);
    const { email, password, fullName, preferences, categories, _id, createdAt, updatedAt, __v } = data;

    expect(res).to.have.status(200);
    expect(message).to.deep.equal(`Hello ${userToRegister.fullName}, you registered to the news app. We will send you the news via email.`);
    expect(email).to.equal(userToRegister.email);
    expect(password).to.equal(userToRegister.password);
    expect(fullName).to.equal(userToRegister.fullName);
    expect(preferences).to.deep.equal(userToRegister.preferences);
    expect(categories).to.deep.equal(userToRegister.categories);
    expect(_id).to.exist;
    expect(createdAt).to.exist;
    expect(updatedAt).to.exist;
    expect(__v).to.exist;
  });
});

describe('Integration Test - Change Categories and Preferences', () => {
  it('Should change user categories and preferences and return the updated data', async () => {
    const userWithNewSettings = {
      email: "test@example.com",
      password: "passworD123",
      newCategories: ["science", "technology"],
      newPreferences: ["Science News", "Tech Updates"]
    };

    const res = await chai.request('http://newsapp:3001')
                          .put('/news/change-user-categories-and-preferences')
                          .send({ userWithNewSettings });
    const { data, message } = jsonParseTextProperty(res);
    const { email, password, fullName, preferences, categories, _id, createdAt, updatedAt, __v } = data;

    expect(res).to.have.status(200);
    expect(message).to.deep.equal("User preferences and categories have been updated.");
    expect(email).to.equal(userWithNewSettings.email);
    expect(password).to.equal(userWithNewSettings.password);
    expect(fullName).to.equal("Test User");
    expect(preferences).to.deep.equal(userWithNewSettings.newPreferences);
    expect(categories).to.deep.equal(userWithNewSettings.newCategories);
    expect(_id).to.exist;
    expect(createdAt).to.exist;
    expect(updatedAt).to.exist;
    expect(__v).to.exist;
  });
});

describe('Integration Test - Change Preferences', () => {
  it('Should change user preferences and return the updated data', async () => {
    const userWithNewPreferences = {
      email: "test@example.com",
      password: "passworD123",
      newPreferences: ["Tech Updates"]
    };

    const res = await chai.request('http://newsapp:3001')
                          .put('/news/change-user-preferences')
                          .send({ userWithNewPreferences });
    const { data, message } = jsonParseTextProperty(res);
    const { email, password, fullName, preferences, categories, _id, createdAt, updatedAt, __v } = data;

    expect(res).to.have.status(200);
    expect(message).to.deep.equal("User preferences have been updated.");
    expect(email).to.equal(userWithNewPreferences.email);
    expect(password).to.equal(userWithNewPreferences.password);
    expect(fullName).to.equal("Test User");
    expect(preferences).to.deep.equal(userWithNewPreferences.newPreferences);
    expect(categories).to.deep.equal(["science", "technology"]); // Assuming categories remain the same as before
    expect(_id).to.exist;
    expect(createdAt).to.exist;
    expect(updatedAt).to.exist;
    expect(__v).to.exist;
  });
});

describe('Integration Test - Change Email', () => {
  it('Should change user email and return the updated data', async () => {
    const userWithNewEmail = {
      email: "test@example.com",
      password: "passworD123",
      newEmail: "newtest@example.com"
    };

    const res = await chai.request('http://newsapp:3001')
                          .put('/news/change-user-email')
                          .send({ userWithNewEmail });
    const { data, message } = jsonParseTextProperty(res);
    const { email, password, fullName, preferences, categories, _id, createdAt, updatedAt, __v } = data;

    expect(res).to.have.status(200);
    expect(message).to.deep.equal("User email has been updated.");
    expect(email).to.equal(userWithNewEmail.newEmail);
    expect(password).to.equal(userWithNewEmail.password);
    expect(fullName).to.equal("Test User");
    expect(preferences).to.deep.equal(["Tech Updates"]); // Assuming preferences remain the same as before
    expect(categories).to.deep.equal(["science", "technology"]); // Assuming categories remain the same as before
    expect(_id).to.exist;
    expect(createdAt).to.exist;
    expect(updatedAt).to.exist;
    expect(__v).to.exist;
  });
});

describe('Integration Test - Change Password', () => {
  it('Should change user password and return a confirmation message', async () => {
    const userWithNewPassword = {
      email: "newtest@example.com",
      oldPassword: "passworD123",
      newPassword: "newPassworD123"
    };

    const res = await chai.request('http://newsapp:3001')
                          .put('/news/change-password')
                          .send({ userWithNewPassword });
    const { data, message } = jsonParseTextProperty(res);
    const { email, password, fullName, preferences, categories, _id, createdAt, updatedAt, __v } = data;

    expect(res).to.have.status(200);
    expect(message).to.deep.equal("User password has been updated.");
    expect(email).to.equal(userWithNewPassword.email);
    expect(password).to.equal(userWithNewPassword.newPassword);
    expect(fullName).to.equal("Test User");
    expect(preferences).to.deep.equal(["Tech Updates"]);
    expect(categories).to.deep.equal(["science", "technology"]);
    expect(_id).to.exist;
    expect(createdAt).to.exist;
    expect(updatedAt).to.exist;
    expect(__v).to.exist;
  });
});

describe('Integration Test - Get News Now', () => {
  it('Should receive a confirmation message and send news to the user', async () => {
    const user = { email: "newtest@example.com", password: "newPassworD123" };

    const res = await chai.request('http://newsapp:3001')
                          .post('/news/get-news-now')
                          .send({ user });
    expect(res).to.have.status(200);
    expect(res.text).to.equal("We received your request. If you are in the system, you will receive news shortly.");
  });
});

describe('Integration Test - User Deletion', () => {
  it('Should delete an existing user and send a confirmation message', async () => {
    const userToDelete = { email: "newtest@example.com", password: "newPassworD123" };

    const res = await chai.request('http://newsapp:3001')
                          .delete('/news/remove-user-from-receiving-news')
                          .send({ user: userToDelete });
    const { data, message } = jsonParseTextProperty(res);

    expect(res).to.have.status(200);
    expect(message).to.deep.equal('You have been removed from the news app.');
    expect(data).to.deep.include({
      acknowledged: true,
      deletedCount: 1
    });
  });
});

describe('Integration Test - Hello World Check', () => {
  it('Should respond with "Hello world from news app"', async () => {
    const res = await chai.request('http://newsapp:3001')
                          .get('/news');
    
    expect(res).to.have.status(200);
    expect(res.text).to.equal("Hello world from news app");
  });
});

function jsonParseTextProperty(res){
    const responseBody = JSON.parse(res.text);
    return responseBody;
}
