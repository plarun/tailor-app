const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCustomerInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be betwwen 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.phone, { min: 10, max: 10 })) {
    errors.phone = "Phone Number is not valid";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone Number field is required";
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
