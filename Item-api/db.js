const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydb'
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoURI);
      console.log('MongoDB connected successfully');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;