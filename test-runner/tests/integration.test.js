const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

describe('Integration Test - User Registration', () => {
  it('Should register a new user and send message that the app will send to the user full name news soon', async () => {
    // Define the user data for registration
    const userToRegister = {
      email: 'test@example.com',
      password: 'passworD123',
      fullName: 'Test User',
      categories: ['environment', 'sports'],
      preferences: ['Environmental News', 'Sports Updates']
    };

    // Simulate a POST request to the user registration endpoint
    const res = await chai.request('http://newsapp:3001')
                          .post('/news/register')
                          .send({ userToRegister });
    const responseBody = jsonParseTextProperty(res);
    expect(res).to.have.status(200);
    expect(responseBody).to.have.property('message').that.deep.equals(`Hello ${userToRegister.fullName}, you registered to the news app. We will send you the news via email.`);
    expect(responseBody).to.have.property('data').that.deep.include({
      email: userToRegister.email,
      password: userToRegister.password,
      fullName: userToRegister.fullName,
      preferences: userToRegister.preferences,
      categories: userToRegister.categories
    });

    // Additional checks for other properties
    expect(responseBody.data).to.have.property('_id');
    expect(responseBody.data).to.have.property('createdAt');
    expect(responseBody.data).to.have.property('updatedAt');
    expect(responseBody.data).to.have.property('__v');
  });
});


describe('Integration Test - Change Categories and Preferences', () => {
    it('Should change user categories and preferences and return the updated data', async () => {
      const userWithNewSettings = {
        email: 'test@example.com',
        password: 'passworD123',
        newCategories: ['science', 'technology'],
        newPreferences: ['Science News', 'Tech Updates']
      };
  
      const res = await chai.request('http://newsapp:3001')
                            .put('/news/change-user-categories-and-preferences')
                            .send({ userWithNewSettings });
      const responseBody = jsonParseTextProperty(res);
  
      expect(res).to.have.status(200);
      expect(responseBody).to.have.property('message').that.deep.equals("User preferences and categories have been updated.");
      expect(responseBody).to.have.property('data').that.deep.include({
        email: userWithNewSettings.email,
        password: userWithNewSettings.password,
        fullName: userWithNewSettings.fullName,
        preferences: userWithNewSettings.newPreferences,
        categories: userWithNewSettings.newCategories
      });
  
      expect(responseBody.data).to.have.property('_id');
      expect(responseBody.data).to.have.property('createdAt');
      expect(responseBody.data).to.have.property('updatedAt');
      expect(responseBody.data).to.have.property('__v');
    });
  });


























































describe('Integration Test - User Deletion', () => {
    it('Should delete an existing user and send a confirmation message', async () => {
      const userToDelete = { email: 'test@example.com', password: 'passworD123' };
  
      const res = await chai.request('http://newsapp:3001')
                            .delete('/news/delete-user')
                            .send({ user: userToDelete });
      const responseBody = jsonParseTextProperty(res);
  
      expect(res).to.have.status(200);
      expect(responseBody).to.have.property('message').that.deep.equals('You have been removed from the news app.');
      expect(responseBody).to.have.property('data').that.deep.include({
        acknowledged: true,
        deletedCount: 1
      });
    });
  });

function jsonParseTextProperty(res){
    const responseBody = JSON.parse(res.text);
    return responseBody
}