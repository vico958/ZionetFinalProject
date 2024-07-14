const { 
    isStringType,
    isArrayAndNotEmpty,
    isListAndFromStringTypeAndNotEmpty,
    isEmailValidAsEmail
  } = require('../general/generalValidation');
  
  describe('Validation Functions', () => {
    
    describe('isArrayAndNotEmpty', () => {
      describe('Given a non-empty array', () => {
        test('Then it should return true', () => {

          const array = [1, 2, 3];
          

          const result = isArrayAndNotEmpty(array);
  

          expect(result).toBe(true);
        });
      });
  
      describe('Given an empty array', () => {
        test('Then it should return false', () => {

          const array = [];
  

          const result = isArrayAndNotEmpty(array);

          expect(result).toBe(false);
        });
      });
  
      describe('Given a non-array input', () => {
        test('Then it should return false', () => {

          const notArray = 'not an array';
  

          const result = isArrayAndNotEmpty(notArray);
  

          expect(result).toBe(false);
        });
      });
    });
  
    describe('isStringType', () => {
      describe('Given a string input', () => {
        test('Then it should return true', () => {

          const str = 'this is a string';
  

          const result = isStringType(str);
  

          expect(result).toBe(true);
        });
      });
  
      describe('Given a non-string input', () => {
        test('Then it should return false for a number', () => {

          const num = 123;
  

          const result = isStringType(num);
  

          expect(result).toBe(false);
        });
  
        test('Then it should return false for an object', () => {

          const obj = {};
  

          const result = isStringType(obj);
  

          expect(result).toBe(false);
        });
  
        test('Then it should return false for an array', () => {

          const arr = [];
  

          const result = isStringType(arr);
  

          expect(result).toBe(false);
        });
      });
    });
  
    describe('isListAndFromStringTypeAndNotEmpty', () => {
      describe('Given a list of non-empty strings', () => {
        test('Then it should return true', () => {

          const list = ['hello', 'world'];
  

          const result = isListAndFromStringTypeAndNotEmpty(list);
  

          expect(result).toBe(true);
        });
      });
  
      describe('Given a non-array input', () => {
        test('Then it should return false', () => {

          const notArray = 'not an array';
  

          const result = isListAndFromStringTypeAndNotEmpty(notArray);
  

          expect(result).toBe(false);
        });
      });
  
      describe('Given an empty array', () => {
        test('Then it should return false', () => {

          const list = [];
  

          const result = isListAndFromStringTypeAndNotEmpty(list);
  

          expect(result).toBe(false);
        });
      });
  
      describe('Given an array with non-string elements', () => {
        test('Then it should return false', () => {

          const list = ['hello', 123];
  

          const result = isListAndFromStringTypeAndNotEmpty(list);
  

          expect(result).toBe(false);
        });
      });
  
      describe('Given an array with empty strings', () => {
        test('Then it should return false', () => {

          const list = ['hello', ''];
  

          const result = isListAndFromStringTypeAndNotEmpty(list);
  

          expect(result).toBe(false);
        });
      });
  
      describe('Given an array with blank strings', () => {
        test('Then it should return false', () => {

          const list = ['hello', '   '];
  

          const result = isListAndFromStringTypeAndNotEmpty(list);
  

          expect(result).toBe(false);
        });
      });
    });
  
    describe('isEmailValidAsEmail', () => {
      describe('Given a valid email', () => {
        test('Then it should return true', () => {

          const email = 'test@example.com';
  

          const result = isEmailValidAsEmail(email);
  

          expect(result).toBe(true);
        });
      });
  
      describe('Given an invalid email', () => {
        test('Then it should return false for an invalid email', () => {

          const invalidEmail = 'invalid-email';
  

          const result = isEmailValidAsEmail(invalidEmail);
  

          expect(result).toBe(false);
        });
  
        test('Then it should return false for an email missing domain part', () => {

          const invalidEmail = 'invalid-email@';
  

          const result = isEmailValidAsEmail(invalidEmail);
  

          expect(result).toBe(false);
        });
  
        test('Then it should return false for an email missing TLD', () => {

          const invalidEmail = 'invalid-email@domain';
  

          const result = isEmailValidAsEmail(invalidEmail);
  

          expect(result).toBe(false);
        });
  
        test('Then it should return false for an email with incomplete TLD', () => {

          const invalidEmail = 'invalid-email@domain.';
  

          const result = isEmailValidAsEmail(invalidEmail);
  

          expect(result).toBe(false);
        });
      });
    });
  });
  