const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: {
    type: Number,
    required: true,
  },
});

module.exports = Counter = mongoose.model("counters", CounterSchema);
