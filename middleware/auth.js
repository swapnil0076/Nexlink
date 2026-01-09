
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User.js');


const userAuth = async (req , res, next) =>{

  try{

    const token = req.cookies.jwtToken;

      if(!token){
        throw new Error("Authentication token not found");
      }

      const decode = jwt.verify(token, "Ring0076");

      const user = await UserModel.findById(decode._id);

      if(!user){
        throw new error("User not found");
      }
      res.send(user);
      next();


  }catch(err){
    return res.status(400).send(err.message);
  }

};



module.exports = {userAuth};