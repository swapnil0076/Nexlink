const mongoose = require('mongoose');
const validator = require('validator');

const experienceSchema = new mongoose.Schema({

  userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Title : { type: String, required: true},
  Role_Name : { type: String, required: true},
  Employment_Type : { type: String, required: true},
  StartDate : {type: Date, required: true},
  EndDate : {type: Date, required: true},
  Currently_Working : { type: Boolean, required: true},
  Location : { type: String, required: true},
  Description : { type: String, maxlength: 1000},
  Location_Type : { type: String, required: true},
  Skills_Used :[{ type: String, maxlength:5}],
  Media :[{ type: String,maxlength:3}]

});

module.exports = mongoose.model('experienceSchema', experienceSchema);