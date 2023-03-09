const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const DressSchema = new Schema({
	gender: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	cost: {
		type: Number,
		required: true
	},
});

module.exports = Dresslist = mongoose.model('dressList', DressSchema);