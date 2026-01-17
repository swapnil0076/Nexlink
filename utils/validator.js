const validator = require('validator');


const validateUserData = (data) =>{
  
const {firstName, lastName, email, password} = data;

if(!firstName || !lastName || !email || !password){
  throw new Error("Missing required fields");
}
else if(firstName.length < 2 || lastName.length < 2){
  throw new Error("First name and Last name must be at least 2 characters long");

}else if(!validator.isEmail(email)){
  throw new Error("Invalid email format");
}
}

const validateEditProfileData = (data) =>{

  const allowedEditFields = ['firstName','lastName','age','gender','photoUrl','skills','about'];

  const isValidAllowed = Object.keys(data.body).every(field =>
    allowedEditFields.includes(field)
  );

  return isValidAllowed;
}

module.exports = {validateUserData, validateEditProfileData};