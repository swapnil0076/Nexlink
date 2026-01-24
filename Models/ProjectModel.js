const mongoose = require('mongoose');
const validator = require('validator');

const projectSchema = new mongoose.Schema({

  userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Project_Name : { type: String, required: true},
  Description : { type: String, maxlength: 1000},
  StartDate : {type: Date, required: true},
  EndDate : {type: Date, required: true},
  Skills_Used :[{ type: String, maxlength:5}],
  Project_URL : { type: String}
});


module.exports = mongoose.model('projectSchema', projectSchema);