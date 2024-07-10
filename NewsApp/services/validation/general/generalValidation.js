function isArrayAndNotEmpty(arr){
    if (!Array.isArray(arr) || arr.length === 0) {
        return false;
      }
      return true;
    
}

function isStringType(itemToCheckIfStringType){
        if (typeof itemToCheckIfStringType !== 'string') {
          return false;
        }
        return true;
}

function isListAndFromStringTypeAndNotEmpty(listToCheck) {
    if (isArrayAndNotEmpty(listToCheck) === false) {
      return false
    }
  
    for (const item of listToCheck) {
      if (isStringType(item) === false || isInputBlank(item)) {
        return false
      }
    }
    return true
}

function isEmailValid(emailToCheck){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToCheck);
  }

function isInputBlank(str) {
    const isWhiteSpacesOnlyRegex = /^\s*$/;
    return (!str || isWhiteSpacesOnlyRegex.test(str));
}
module.exports = {
    isStringType,
    isArrayAndNotEmpty,
    isListAndFromStringTypeAndNotEmpty,
    isEmailValid
  }