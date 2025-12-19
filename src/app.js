const express = require('express');

const app = express();


app.use("/first", (req, res) =>{
  res.send("Hello From Server");
})

app.use("/hello", (req, res) =>{
  res.send("Hello Hello Hello");
})

app.use("/test", (req, res) =>{
  res.send("Server is testing the NodeMon");
})


app.listen(3000 , () =>{
  console.log("Server is running on port 3000");
});








