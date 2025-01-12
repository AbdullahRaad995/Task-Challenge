const mongoose = require('mongoose');

const phoneInfoSchema = new mongoose.Schema({
  country_name: String,
  country_code : String,
  operator_name : String
});

// Export the model
module.exports = mongoose.model('Phone Info', phoneInfoSchema);