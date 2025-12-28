const mongoose = require('mongoose');
require('dotenv').config();

const mongodbUrl = process.env.MONGODB_URI;

const connectDB = async () => {
 await mongoose.connect(
  mongodbUrl
 )
}

module.exports = connectDB;



