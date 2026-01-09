const express = require('express');
const { userAuth } = require('../middleware/auth.js');
const connectDB = require('../config/database.js');
const app = express();
const User = require('../Models/User.js');
const { validateUserData } = require('../utils/validator.js');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.post('/SignUp' , async (req , res) => {

validateUserData(req.body);

const {password} = req.body;

console.log("Password before hashing: ", password);

const encryptedPassword = await bcrypt.hash(password,1);

console.log("Password after hashing: ", encryptedPassword.toString());


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


app.post('/signIn', async (req , res) =>{

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
    console.log("Generated Token: ", token);


    res.status(200).send({message: "Sign In Successful"});


  }catch (error) {
    return res.status(400).send(error.message);
   }

});

app.get('/profile', userAuth, async (req , res) => {

  try{
     const user = userAuth.user;

      res.status(200).send(user);

  }catch (error) {
    return res.status(401).send(error.message);
  }

});






connectDB().then(() => {
 console.log("Database connected successfully");

  app.listen(3000 , () =>{
    console.log("Server is running on port 3000");
  });

}).catch((err) => {
 console.error("Database connection failed:", err);
});

















