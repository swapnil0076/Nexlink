const express = require('express');
const { adminAuth , userAuth } = require('../middleware/auth.js');

const app = express();

app.use("/admin", adminAuth);
app.use("/user", userAuth);

app.get("/admin/user",  adminAuth ,(req, res)=>{
  res.send("Admin route");
});

app.post("/admin/createNewUser",  adminAuth ,(req, res)=>{
  res.send("New Admin Created");
});

app.delete("/admin/deleteUser",  adminAuth ,(req, res)=>{
  res.send("Admin Deleted");
});

app.get("/pkd", (req, res)=>{
  res.send("User route");
});

app.post("/user/createNewUser",  userAuth ,(req, res)=>{
  res.send("New User Created");
});

app.delete("/user/deleteUser",  userAuth ,(req, res)=>{
  res.send("User Deleted");
});


app.listen(3000 , () =>{
  console.log("Server is running on port 3000");
});








