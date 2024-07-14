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




function jsonParseTextProperty(res){
    const responseBody = JSON.parse(res.text);
    return responseBody
}