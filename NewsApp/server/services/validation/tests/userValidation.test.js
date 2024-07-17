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
    describe('Given invalid categories', () => {
      test('Then it should throw an error', async () => {

        const categories = [];

        await expect(isCategoriesValidIfNotThrowError(categories)).rejects.toThrow("Categories must be an array of strings.");
      });
    });
  });

  describe('isRegisterUserValidIfNotThrowError', () => {
    describe('Given invalid user data', () => {
      test('Then it should throw an error', async () => {

        const userToRegister = {
          email: 'invalid-email',
          password: 'invalid',
          fullName: 'John',
          preferences: [],
          categories: []
        };

        await expect(isRegisterUserValidIfNotThrowError(userToRegister)).rejects.toThrow();
      });
    });
  });

  describe('isChangeCategoriesAndPreferencesValidIfNotThrowError', () => {
    describe('Given invalid categories and preferences', () => {
      test('Then it should throw an error', async () => {

        const categories = [];
        const preferences = [];

        await expect(isChangeCategoriesAndPreferencesValidIfNotThrowError(categories, preferences)).rejects.toThrow();
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
