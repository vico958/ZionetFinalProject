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

module.exports = {
    isStringType,
    isArray
  }