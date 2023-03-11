const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateOrderInput(data) {
  let errors = {};

  console.log(data);

  data.orderStatus = !isEmpty(data.orderStatus) ? data.orderStatus : "";
  data.deliveryDays = !isEmpty(data.deliveryDays) ? data.deliveryDays : 0;
  data.dressType = !isEmpty(data.dressType) ? data.dressType : "";
  data.customer = !isEmpty(data.customer) ? data.customer : "";
  data.user = !isEmpty(data.user) ? data.user : "";

  if (!Validator.isLength(data.orderStatus, { min: 2, max: 200 })) {
    errors.note = "Note must be between 2 and 200 characters";
  }

  if (Validator.isEmpty(data.orderStatus)) {
    errors.orderStatus = "Order status field is required";
  }

  if (Validator.isEmpty(data.deliveryDays)) {
    errors.deliveryDays = "Delivery days feild is required";
  }

  if (Validator.isEmpty(data.dressType)) {
    errors.dressType = "Dress Type feilds are required";
  }

  if (Validator.isEmpty(data.customer)) {
    errors.customer = "Customer feild is required";
  }

  if (Validator.isEmpty(data.user)) {
    errors.user = "Tailor feilds are required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
