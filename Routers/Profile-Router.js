const express = require('express');
const profileRouter = express();
const { userAuth } = require('../middleware/auth.js');
const { validateEditProfileData } = require('../utils/validator.js');
profileRouter.use(express.json());


profileRouter.get('/profile', userAuth, async (req , res) => {

  try{
     const user = userAuth.user;

      res.status(200).send(user);

  }catch (error) {
    return res.status(401).send(error.message);
  }

});

profileRouter.patch('/editProfile',userAuth, async(req, res) =>{

  try{
    
    if(!validateEditProfileData(req)){
      throw new Error("Invalid fields in request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((field) => {
      loggedInUser[field] = req.body[field];
    });

    await loggedInUser.save();

    return  res.status(200).send(`${loggedInUser.firstName} Profile updated successfully`);


  }catch(error){
    return res.status(400).send(error.message);
  }

})


module.exports = profileRouter;