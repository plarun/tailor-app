const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const OrderSchema = new Schema({
	tailor: {
		user: {
			type: Schema.Types.ObjectId,
			ref: 'users'
		}
	},
	customer: {
		customer: {
			type: Schema.Types.ObjectId,
			ref: 'customers'
		}
	},
	dressType: {
		dress: {
			type: Schema.Types.ObjectId,
			ref: 'dressLists'
		}
	},
	order_date: {
		type: Date,
		default: Date.now
	},
	delivery_days: {
		type: Number,
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