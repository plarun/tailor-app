const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CustomerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	},
	upper: {
		neck: {
			type: String
		},
		shoulder: {
			type: String
		},
		fullarm: {
			type: String
		},
		halfarm: {
			type: String
		},
		sleeve: {
			type: String
		},
		wrist: {
			type: String
		},
		elbow: {
			type: String
		},
		chest: {
			type: String
		},
		hip: {
			type: String
		},
		body: {
			type: String
		},
	},
	lower: {
		thigh: {
			type: String
		},
		knee: {
			type: String
		},
		seat: {
			type: String
		},
		leg_half: {
			type: String
		},
		leg_full: {
			type: String
		},
		ankle: {
			type: String
		},
	}
});

module.exports = Customer = mongoose.model('customers', CustomerSchema);