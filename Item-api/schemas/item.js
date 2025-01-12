const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discription : String,
  phone_number : String,
  phone_info : {
    type : Schema.Types.ObjectId,
    ref: 'Phone Info'
  },
  category : {
    type : Schema.Types.ObjectId,
    ref: 'Category'
  }
});

// Export the model
module.exports = mongoose.model('Item', itemSchema);