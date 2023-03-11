const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDresstypeInput(data) {
  let errors = {};

  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.cost = !isEmpty(data.cost) ? data.cost : "";

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = "Name must be betwwen 2 and 50 characters";
  }

  if (Validator.isEmpty(data.cost)) {
    errors.cost = "Cost field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
