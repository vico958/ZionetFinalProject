function isArray(arr){
    if (!Array.isArray(arr)) {
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

function isListAndFromStringType(listToCheck, listName) {
    if (isArray(listToCheck) === false) {
      return { valid: false, message: `${listName} should be an array.` };
    }
  
    for (const item of listToCheck) {
      if (isStringType(item) === false) {
        return { valid: false, message: `All elements in the ${listName} should be strings.` };
      }
    }
    return { valid: true, message: `${listName} are valid.` };
}

module.exports = {
    isStringType,
    isArray,
    isListAndFromStringType
  }