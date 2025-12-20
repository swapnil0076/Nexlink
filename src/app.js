const express = require('express');
const {sampleData} = require('./Data');

const app = express();


app.get("/user/:user_id", (req, res) =>{

  

 sampleData.forEach((user) =>{
    if(user.id == req.params.user_id){
      return res.send(user);
    }
 })

 console.log(req.params.user_id);
});


app.use("/", (req, res) =>{
  res.send("Welcome to the Home Page");
})


app.listen(3000 , () =>{
  console.log("Server is running on port 3000");
});








