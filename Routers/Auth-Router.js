const { validateUserData } = require('../utils/validator.js');
const bcrypt = require('bcrypt');
const express = require('express');
const authRouter = express();
const User = require('../Models/User.js');



authRouter.post('/SignUp' , async (req , res) => {

validateUserData(req.body);

const {password} = req.body;

console.log("Password before hashing: ", password);

const encryptedPassword = await bcrypt.hash(password,1);


const user = new User({
  firstName : req.body.firstName,
  lastName : req.body.lastName,
  email : req.body.email,
  password : encryptedPassword,
  age : req.body.age,
  gender : req.body.gender,
  photoUrl : req.body.photoUrl,
  skills : req.body.skills
});

await user.save().then(() => {
      res.status(201).send({ message: "User registered successfully" });
      }).catch((err) => {
    res.status(500).send({ error: "Failed to register user", details: err });
  })
});


authRouter.post('/signIn', async (req , res) =>{

  const {email,password} = req.body;

  try {

    const user = await User.findOne({email:email});

    if(!user){
      throw new Error("InCorrect Creditials");
    }

    const isPasswordMatch = await user.ValidatePassword(password);
    

    if(!isPasswordMatch){
      throw new Error("InCorrect Creditials");
    }

    const token = user.jwtToken();
    
    res.cookie("jwtToken", token , { expires: new Date(Date.now() + 1*3600000)});


    res.status(200).send({message: "Sign In Successful"});

  }catch (error) {
    return res.status(400).send(error.message);
   }

});


authRouter.post('/logout', (req , res) => {

  res.cookie("jwtToken", {
    expires: new Date(Date.now())
  }).send({message: "Logged Out Successfully"});

})

module.exports = authRouter;
