const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
export default (fields, submit = false) => {
  let errors = {};
  for (let field in fields) {
    if (submit) {
      fields[field].touched = true;
    }
    if (
      fields[field].required &&
      (fields[field].value === "" || !fields[field].value) &&
      fields[field].touched
    ) {
      errors[field] = fields[field].requiredMessage
        ? fields[field].requiredMessage
        : "This field is required!";
    }
    if (
      fields[field].file &&
      fields[field].required &&
      Object.keys(fields[field].value).length === 0 &&
      fields[field].touched
    ) {
      errors[field] = fields[field].requiredMessage
        ? fields[field].requiredMessage
        : "This field is required!";
    }
    if (
      !errors[field] &&
      fields[field].email &&
      !validateEmail(fields[field].value) &&
      fields[field].touched
    ) {
      errors[field] = fields[field].emailMessage
        ? fields[field].emailMessage
        : "Invalid email address!";
    }
    if (
      !errors[field] &&
      fields[field].matchWith &&
      fields[field].value !== fields[fields[field].matchWith].value &&
      fields[field].touched
    ) {
      errors[field] = fields[field].matchWithMessage
        ? fields[field].matchWithMessage
        : "Fields are not equal!";
    }
    if (
      !errors[field] &&
      fields[field].minLength &&
      fields[field].value !== "" &&
      fields[field].value.length < fields[field].minLength &&
      fields[field].touched
    ) {
      errors[field] = fields[field].minLengthMessage
        ? fields[field].minLengthMessage
        : `at least ${fields[field].minLength} characters`;
    }
    if (
      !errors[field] &&
      fields[field].maxLength &&
      fields[field].value !== "" &&
      fields[field].value.length > fields[field].maxLength &&
      fields[field].touched
    ) {
      errors[field] = fields[field].maxLengthMessage
        ? fields[field].maxLengthMessage
        : `This field must have less than ${fields[field].maxLength} characters`;
    }
    if (
      !errors[field] &&
      fields[field].file &&
      fields[field].touched &&
      fields[field].allowedTypes &&
      !fields[field].allowedTypes.includes(
        fields[field].value[0].type.split("/")[1]
      )
    ) {
      errors[field] = fields[field].allowedTypesMessage
        ? fields[field].allowedTypesMessage
        : "Invalid file type!";
    }
    if (
      !errors[field] &&
      fields[field].file &&
      fields[field].touched &&
      fields[field].maxFileSize &&
      fields[field].maxFileSize * 1024 < Math.round(fields[field].value[0].size)
    ) {
      errors[field] = fields[field].maxFileSizeMessage
        ? fields[field].maxFileSizeMessage
        : `File is too large(${Math.round(
            fields[field].value[0].size / 1024
          )}KB), it cannot be larger than ${fields[field].maxFileSize}KB`;
    }
  }
  return errors;
};
