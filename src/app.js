const express = require('express');
const connectDB = require('../config/database.js');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const authRouter = require('../Routers/Auth-Router.js');
const profileRouter = require('../Routers/Profile-Router.js'); 
const connectionRouter = require('../Routers/Connection-Router.js');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', connectionRouter);


connectDB().then(() => {
 console.log("Database connected successfully");

  app.listen(3000 , () =>{
    console.log("Server is running on port 3000");
  });

}).catch((err) => {
 console.error("Database connection failed:", err);
});

















