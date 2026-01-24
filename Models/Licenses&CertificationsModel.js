const mongoose = require('mongoose');
const validator = require('validator');

const LicensesAndCertificationsSchema = new mongoose.Schema({

  userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Name : { type: String, required: true},
  Issuing_Organization : { type: String, required: true},
  issueDate : { type: Date, required: true},
  Expiration_Date : { type: Date},
  Credential_URL : { type: String},
  Credential_ID : { type: String},
  Skills_Used :[{ type: String, maxlength:5}],
  Media :[{ type: String,maxlength:3}]

});


module.exports = mongoose.model('LicensesAndCertifications', LicensesAndCertificationsSchema);