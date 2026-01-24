const mongoose = require('mongoose');
const validator = require('validator');

const EducationSchema = new mongoose.Schema({
userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
institutionName : { type: String, required: true},
degree : { type: String, required: true},
Field_of_Study : { type: String, required: true},
Start_Year : { type: Number, required: true},
End_Year : { type: Number, required: true},
Grade : { type: String},
Activities_and_Societies : { type: String, maxlength: 500},
Description : { type: String, maxlength: 1000}

});


module.exports = mongoose.model('EducationScheme', EducationSchema);