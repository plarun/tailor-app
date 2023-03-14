const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "customers",
  },
  dressType: {
    type: Schema.Types.ObjectId,
    ref: "dressLists",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDays: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  deliveredOn: {
    type: Date,
    default: null,
  },
});

module.exports = Order = mongoose.model("orders", OrderSchema);
