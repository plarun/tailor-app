const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const OrderSchema = new Schema({
	tailor: {
		user: {
			type: Schema.Types.ObjectId,
			ref: 'users'
		},
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		}
	},
	customer: {
		customer: {
			type: Schema.Types.ObjectId,
			ref: 'customers'
		},
		name: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true
		}
	},
	dressType: {
		dress: {
			type: Schema.Types.ObjectId,
			ref: 'dressLists'
		},
		name: {
			type: String,
			required: true
		}
	},
	order_date: {
		type: Date,
		default: Date.now
	},
	delivery_date: {
		type: Date,
		required: true
	},
	order_status: {
		type: String,
		required: true
	},
	note: {
		type: String,
	}
	
});

module.exports = Order = mongoose.model('orders', OrderSchema);