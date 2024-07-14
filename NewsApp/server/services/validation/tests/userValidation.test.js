const { 
  isRegisterUserValidIfNotThrowError,
  isChangeCategoriesAndPreferencesValidIfNotThrowError,
  isChangePreferencesValidIfNotThrowError,
  isChangeEmailValidIfNotThrowError,
  isChangePasswordValidIfNotThrowError,
  isUserPasswordValidIfNotThrowError,
  isUserFullNameValidIfNotThrowError,
  isUserEmailValidIfNotThrowError,
  isPreferencesValidIfNotThrowError,
  isCategoriesValidIfNotThrowError
} = require('../userValidation/userValidation');

describe('Validation Functions', () => {

  describe('isUserPasswordValidIfNotThrowError', () => {
    describe('Given a valid password', () => {
      test('Then it should not throw an error', () => {

        const password = 'Valid123';


        expect(() => isUserPasswordValidIfNotThrowError(password)).not.toThrow();
      });
    });

    describe('Given an invalid password', () => {
      test('Then it should throw an error', () => {

        const password = 'invalid';


        expect(() => isUserPasswordValidIfNotThrowError(password)).toThrow("Password should contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.");
      });
    });
  });

  describe('isUserFullNameValidIfNotThrowError', () => {
    describe('Given a valid full name', () => {
      test('Then it should not throw an error', () => {

        const fullName = 'John Doe';


        expect(() => isUserFullNameValidIfNotThrowError(fullName)).not.toThrow();
      });
    });

    describe('Given an invalid full name', () => {
      test('Then it should throw an error', () => {

        const fullName = 'John';


        expect(() => isUserFullNameValidIfNotThrowError(fullName)).toThrow("Full name must be in English and include both a first name and a last name.");
      });
    });
  });

  describe('isUserEmailValidIfNotThrowError', () => {
    describe('Given a valid email', () => {
      test('Then it should not throw an error', () => {

        const email = 'test@example.com';


        expect(() => isUserEmailValidIfNotThrowError(email)).not.toThrow();
      });
    });

    describe('Given an invalid email', () => {
      test('Then it should throw an error', () => {

        const email = 'invalid-email';


        expect(() => isUserEmailValidIfNotThrowError(email)).toThrow("Email address is not valid.");
      });
    });
  });

  describe('isPreferencesValidIfNotThrowError', () => {
    describe('Given valid preferences', () => {
      test('Then it should not throw an error', () => {

        const preferences = ['News', 'Sports'];


        expect(() => isPreferencesValidIfNotThrowError(preferences)).not.toThrow();
      });
    });

    describe('Given invalid preferences', () => {
      test('Then it should throw an error', () => {

        const preferences = [];


        expect(() => isPreferencesValidIfNotThrowError(preferences)).toThrow("Preferences must be an array of strings.");
      });
    });
  });

  describe('isCategoriesValidIfNotThrowError', () => {
    describe('Given valid categories', () => {
      test('Then it should not throw an error', () => {

        const categories = ['Tech', 'Health'];


        expect(() => isCategoriesValidIfNotThrowError(categories)).not.toThrow();
      });
    });

    describe('Given invalid categories', () => {
      test('Then it should throw an error', () => {

        const categories = [];


        expect(() => isCategoriesValidIfNotThrowError(categories)).toThrow("Categories must be an array of strings.");
      });
    });
  });

  describe('isRegisterUserValidIfNotThrowError', () => {
    describe('Given valid user data', () => {
      test('Then it should not throw an error', () => {

        const userToRegister = {
          email: 'test@example.com',
          password: 'Valid123',
          fullName: 'John Doe',
          preferences: ['News', 'Sports'],
          categories: ['Tech', 'Health']
        };


        expect(() => isRegisterUserValidIfNotThrowError(userToRegister)).not.toThrow();
      });
    });

    describe('Given invalid user data', () => {
      test('Then it should throw an error', () => {

        const userToRegister = {
          email: 'invalid-email',
          password: 'invalid',
          fullName: 'John',
          preferences: [],
          categories: []
        };


        expect(() => isRegisterUserValidIfNotThrowError(userToRegister)).toThrow();
      });
    });
  });

  describe('isChangeCategoriesAndPreferencesValidIfNotThrowError', () => {
    describe('Given valid categories and preferences', () => {
      test('Then it should not throw an error', () => {

        const categories = ['Tech', 'Health'];
        const preferences = ['News', 'Sports'];


        expect(() => isChangeCategoriesAndPreferencesValidIfNotThrowError(categories, preferences)).not.toThrow();
      });
    });

    describe('Given invalid categories and preferences', () => {
      test('Then it should throw an error', () => {

        const categories = [];
        const preferences = [];


        expect(() => isChangeCategoriesAndPreferencesValidIfNotThrowError(categories, preferences)).toThrow();
      });
    });
  });

  describe('isChangePreferencesValidIfNotThrowError', () => {
    describe('Given valid preferences', () => {
      test('Then it should not throw an error', () => {

        const preferences = ['News', 'Sports'];


        expect(() => isChangePreferencesValidIfNotThrowError(preferences)).not.toThrow();
      });
    });

    describe('Given invalid preferences', () => {
      test('Then it should throw an error', () => {

        const preferences = [];


        expect(() => isChangePreferencesValidIfNotThrowError(preferences)).toThrow();
      });
    });
  });

  describe('isChangeEmailValidIfNotThrowError', () => {
    describe('Given a valid email', () => {
      test('Then it should not throw an error', () => {

        const email = 'test@example.com';


        expect(() => isChangeEmailValidIfNotThrowError(email)).not.toThrow();
      });
    });

    describe('Given an invalid email', () => {
      test('Then it should throw an error', () => {

        const email = 'invalid-email';


        expect(() => isChangeEmailValidIfNotThrowError(email)).toThrow("Email address is not valid.");
      });
    });
  });

  describe('isChangePasswordValidIfNotThrowError', () => {
    describe('Given a valid password', () => {
      test('Then it should not throw an error', () => {

        const password = 'Valid123';


        expect(() => isChangePasswordValidIfNotThrowError(password)).not.toThrow();
      });
    });

    describe('Given an invalid password', () => {
      test('Then it should throw an error', () => {

        const password = 'invalid';


        expect(() => isChangePasswordValidIfNotThrowError(password)).toThrow("Password should contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.");
      });
    });
  });
});
