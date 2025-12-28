const mongoose = require('mongoose');

const connectDB = async () => {
 await mongoose.connect(
  "mongodb+srv://swapnildhiman910:LHjJ1TA3asQ5EJQJ@cluster0.zjltn9t.mongodb.net/NEXLINK"
 )
}

module.exports = connectDB;



