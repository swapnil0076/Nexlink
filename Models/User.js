const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

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


userSchema.methods.jwtToken = function(){

  const user = this;

  const token = jsonwebtoken.sign({_id : user._id}, "Ring0076",{
      expiresIn : '1h'
    })

    return token;

}

userSchema.methods.ValidatePassword = async function(passwordEnteredByUser){

  const user = this;
  const encryptedPasswordFromDB = user.password;

  const isPasswordMatch = await bcrypt.compare(passwordEnteredByUser, encryptedPasswordFromDB);

  return isPasswordMatch;

}



const UserModel =  mongoose.model('User' , userSchema);

module.exports = UserModel;