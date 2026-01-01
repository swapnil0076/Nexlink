const express = require('express');

const connectDB = require('../config/database.js');
const app = express();
const User = require('../Models/User.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/SignUp' , async (req , res) => {


const user = new User(req.body);

await user.save().then(() => {
      res.status(201).send({ message: "User registered successfully" });
      }).catch((err) => {
    res.status(500).send({ error: "Failed to register user", details: err });
  })
});


app.post('/signIn', async (req , res) =>{

  const {email,password} = req.body;
  console.log(email);

  await User.findOne({email}).then((u) =>{

    if(password !== u.password){
      res.status(401).send("Please check your password");
    }else{
      res.status(200).send("User signed in successfully");
    }

    console.log(u.firstName);
  })

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

app.patch('/user', async (req, res) =>{

const {_id} = req.body.userId;
const data = req.body;

  const updatedUser = await User.findOneAndUpdate({_id:user_Id},data)

  console.log(data);

  if(!updatedUser){
    return res.status(404).send({error : "User not found"});
  }

  res.status(200).send("User updated successfully");

});


connectDB().then(() => {
 console.log("Database connected successfully");

  app.listen(3000 , () =>{
    console.log("Server is running on port 3000");
  });

}).catch((err) => {
 console.error("Database connection failed:", err);
});

















