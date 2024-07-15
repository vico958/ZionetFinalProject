const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

describe('Negative Integration Tests', function() {
  // Set a longer timeout for the entire suite
  this.timeout(10000); 

  before(async function() {
    // Set a longer timeout for the "before all" hook
    this.timeout(10000); 

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
  });

  it('Should fail to register a user with an already used email', async function() {
    this.timeout(5000); // Set a longer timeout for this test

    const badUserToRegister = {
      email: "testBad@example.com", // Email already registered in before hook
      password: "anotherPassword123",
      fullName: "Another Test User",
      categories: ["environment", "technology"],
      preferences: ["Tech News", "Environmental Updates"]
    };

    const res = await chai.request('http://newsapp:3001')
                          .post('/news/register')
                          .send({ userToRegister: badUserToRegister });

    expect(res).to.have.status(400);
    expect(res.text).to.deep.equal("Email already use");
  });
  

  it('Should fail to delete a user with incorrect password', async function() {
    this.timeout(5000); // Set a longer timeout for this test

    const userToDelete = { email: "testBad@example.com", password: "wrongPassword" };

    const res = await chai.request('http://newsapp:3001')
                          .delete('/news/remove-user-from-receiving-news')
                          .send({ user: userToDelete });

    expect(res).to.have.status(400);
    expect(res.text).to.deep.equal("Unable to remove user: email or password are not valid.");
  });

/*
  ===============================================================================
  IMPORTANT NOTICE:
  
  THIS TEST SHOULD BE USED, BUT BECAUSE WE USE A FREE EMAIL SERVICE, I DON'T WANT 
  TO REGISTER ANOTHER USER THAT WILL HAVE THIS newEmail. SO UNTIL WE MOVE TO A 
  PAID EMAIL SERVICE, THIS TEST WILL REMAIN COMMENTED OUT.
  ===============================================================================

  it('Should fail to change email if new email is already in use', async function() {
    this.timeout(5000); // Set a longer timeout for this test

    const userWithNewEmail = {
      email: "testBad@example.com", // Current email
      password: "passworD123", // Correct password
      newEmail: "alreadyusedBad@example.com" // Email already registered in before hook
    };

    const res = await chai.request('http://newsapp:3001')
                          .put('/news/change-user-email')
                          .send({ userWithNewEmail });

    expect(res).to.have.status(400);
    expect(res.text).to.deep.equal("Email already use");
  });
*/



  it('Should fail to change password with incorrect old password', async function() {
    this.timeout(5000); // Set a longer timeout for this test

    const userWithNewPassword = {
      email: "testBad@example.com",
      oldPassword: "wrongOldPassword",
      newPassword: "newPassworD123"
    };

    const res = await chai.request('http://newsapp:3001')
                          .put('/news/change-password')
                          .send({ userWithNewPassword });

    expect(res).to.have.status(400);
    expect(res.text).to.deep.equal("old password doesnt match");
  });
});