const express = require('express');
const { userAuth } = require('../middleware/auth.js');
const profileRouter = express();


profileRouter.get('/profile', userAuth, async (req , res) => {

  try{
     const user = userAuth.user;

      res.status(200).send(user);

  }catch (error) {
    return res.status(401).send(error.message);
  }

});

module.exports = profileRouter;