const express = require('express');

const connectDB = require('../config/database.js');
const app = express();
const User = require('../Models/User.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/SignUp' , async (req , res) => {
 
const userDb = {
  firstName : req.body.firstName,
  lastName : req.body.lastName,
  email : req.body.email,
  password : req.body.password,
  age : req.body.age,
  gender : req.body.gender
}



const user = new User(userDb);

await user.save().then(() => {
  res.status(201).send({ message: "User registered successfully" });
}).catch((err) => {
  res.status(500).send({ error: "Failed to register user", details: err });
});
});


connectDB().then(() => {
 console.log("Database connected successfully");

  app.listen(3000 , () =>{
    console.log("Server is running on port 3000");
  });

}).catch((err) => {
 console.error("Database connection failed:", err);
});

















