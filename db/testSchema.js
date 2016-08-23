const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: String,
  addressNumber: Number,
  addressStreet: String,
  state: String,
  zip: Number
});

const Test = mongoose.model('testing', testSchema);

module.exports = Test;