const { isSendEmailInfoValid } = require('../emailValidation/emailValidation');

describe('isSendEmailInfoValid', () => {

  describe('Given valid email information', () => {
    test('Then it should return true', () => {

      const emailHost = 'smtp@example.com';
      const emailUser = 'user@example.com';
      const emailPassword = 'password123';
      const emailFrom = 'from@example.com';
      const emailTo = 'to@example.com';
      const emailSubject = 'Test Subject';
      const emailText = 'This is a test email.';


      const result = isSendEmailInfoValid(emailHost, emailUser, emailPassword, emailFrom, emailTo, emailSubject, emailText);


      expect(result).toBe(true);
    });
  });

  describe('Given invalid string inputs', () => {
    test('Then it should return false', () => {

      const emailHost = 'smtp.example.com';
      const emailUser = 'user@example.com';
      const emailPassword = ''; // Invalid
      const emailFrom = 'from@example.com';
      const emailTo = 'to@example.com';
      const emailSubject = 'Test Subject';
      const emailText = 'This is a test email.';


      const result = isSendEmailInfoValid(emailHost, emailUser, emailPassword, emailFrom, emailTo, emailSubject, emailText);


      expect(result).toBe(false);
    });
  });

  describe('Given invalid email inputs', () => {
    test('Then it should return false', () => {

      const emailHost = 'smtp.example.com';
      const emailUser = 'user@example.com';
      const emailPassword = 'password123';
      const emailFrom = 'invalid-email'; // Invalid
      const emailTo = 'to@example.com';
      const emailSubject = 'Test Subject';
      const emailText = 'This is a test email.';


      const result = isSendEmailInfoValid(emailHost, emailUser, emailPassword, emailFrom, emailTo, emailSubject, emailText);


      expect(result).toBe(false);
    });
  });

  describe('Given valid strings but invalid email formats', () => {
    test('Then it should return false', () => {

      const emailHost = 'smtp.example.com';
      const emailUser = 'invalid-email'; // Invalid
      const emailPassword = 'password123';
      const emailFrom = 'from@example.com';
      const emailTo = 'to@example.com';
      const emailSubject = 'Test Subject';
      const emailText = 'This is a test email.';


      const result = isSendEmailInfoValid(emailHost, emailUser, emailPassword, emailFrom, emailTo, emailSubject, emailText);


      expect(result).toBe(false);
    });
  });

});
