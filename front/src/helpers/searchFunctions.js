function checkValueInObject(obj, targetValue) {
  for (const key in obj) {
    if (obj[key] === targetValue) {
      return true;
    } else if (typeof obj[key] === "object") {
      if (checkValueInObject(obj[key], targetValue)) {
        return true;
      }
    }
  }
  return false;
}

export default {
  checkValueInObject,
};
