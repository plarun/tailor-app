const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateOrderInput(data) {
	let errors = {};

	data.order_status = !isEmpty(data.order_status) ? data.order_status : '';
	data.delivery_date = !isEmpty(data.delivery_date) ? data.delivery_date : '';
	data.dressType = !isEmpty(data.dressType) ? data.dressType : '';
	data.customer = !isEmpty(data.customer) ? data.customer : '';
	data.user = !isEmpty(data.user) ? data.user : '';

	if (!Validator.isLength(data.order_status, { min: 2, max: 200 })) {
		errors.note = 'Note must be between 2 and 200 characters';
	}

	if (Validator.isEmpty(data.order_status)) {
		errors.order_status = 'Order status field is required';
	}

	if (Validator.isEmpty(data.delivery_date)) {
		errors.delivery_date = 'Delivery date feild is required';
	}

	if(Validator.isEmpty(data.dressType)) {
		errors.dressType = 'Dress Type feilds are required'
	}

	if(Validator.isEmpty(data.customer)) {
		errors.customer = 'Customer feild is required'
	}

	if(Validator.isEmpty(data.user)) {
		errors.user = 'Tailor feilds are required'
	}


	return {
		errors,
		isValid: isEmpty(errors)
	};
};