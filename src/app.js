const express = require('express');

const connectDB = require('../config/database.js');
const app = express();
const User = require('../Models/User.js');
const { validateUserData } = require('../utils/validator.js');
const bcrypt = require('bcrypt');

app.use(express.json());
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

    const isPasswordMatch = await bcrypt.compare(password,user.password);

    if(!isPasswordMatch){
      throw new Error("InCorrect Creditials");
    }
    res.status(200).send({message: "Sign In Successful"});


  }catch (error) {
    return res.status(400).send(error.message);
   }

});


app.get('/getUser/:userId' , async (req , res) => {
 const userId = req.params.userId; 

  await User.findById(userId).then((user) => {
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }else {
      res.status(200).send(user);
    }
  }).catch((err) => {
    res.status(500).send({ error: "Failed to retrieve user", details: err });
  });
});


app.delete('/user', async (req, res) =>{

const {userId} = req.body;
  await User.findByIdAndDelete(userId).then((u) =>{
    res.status(200).send("User deleted successfully");
  }).catch((err) =>{
    res.status(500).send({ error: "Failed to delete user", details: err });
  })

})

app.patch('/user/:userId', async (req, res) =>{

const userId = req.params?.userId;
const data = req.body;
 try {
  const AllowedUpdates = ['firstName', 'lastName', 'password', 'photoUrl','skills'];
  
  

  const requestedUpdates = Object.keys(data);
  const isValidUpdate = requestedUpdates.every((update) => AllowedUpdates.includes(update));

  if(!isValidUpdate){
    throw new Error("You Cannot Update the Email, Gender or Age of the User");
  }

  if(data?.skills.length > 10){
    throw new Error("Cannot add more than 10 skills");
  }

  const updatedUser = await User.findOneAndUpdate({_id:userId},data,{runValidators:true});

  if(!updatedUser){
    throw new Error("User not found");
  }

  res.status(200).send("User updated successfully");

 }catch (error) {
  return res.status(400).send(error.message);
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

















