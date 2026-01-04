const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName : { type: String, required: true,minlength: 2},
  lastName : { type: String, required: true,minlength: 2},
  email : { type: String, required: true, unique: true,trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is invalid :"+ value);
      }
    }
  },
  password : { type: String, required: true, minlength: 6},
  age : { type: Number, required: true,min: 18,max: 60},
  gender : { type: String, enum: ['male', 'female', 'other'], required: true},
  photoUrl : { type: String,
     validate(value){
      if(!validator.isURL(value)){
        throw new Error("invalid URL:"+ value);
      }
    }
  },
  skills : [{ type: String }]
},{timestamps: true});

const UserModel =  mongoose.model('User' , userSchema);

module.exports = UserModel;