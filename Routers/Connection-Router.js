const express = require('express');
const connectionRouter = express();
const Connection = require('../Models/ConnectionModel.js');
const User = require('../Models/User.js');
const { userAuth } = require('../middleware/auth.js');
connectionRouter.use(express.json());

connectionRouter.get('/connections',userAuth, async (req, res) =>{

  try{
    const user = req.user;

    const connections = await Connection.find({
      $or:[
        {fromUserId : user._id},
        {toUserId : req.params.toUser_id}
      ]
    });
    res.status(200).send(connections);

  } catch(error){
    res.status(500).send(error.message);
  }

});


connectionRouter.post('/sendConnectionRequest/:toUser_id',userAuth, async (req, res) =>{

  try{

    const user = req.user;
    const toUserId = req.params.toUser_id;

    const existingRequest = await Connection.findOne({
      $or: [
        { fromUserId: user._id, toUserId: toUserId },
    { fromUserId: toUserId, toUserId: user._id }
      ]
    });

    if(existingRequest){
      throw new Error("Connection already exists");
    }

    const sendingUser =  await User.findById(toUserId)

    if(!sendingUser){
      throw new Error("From User does not exist");
    }

    const connection = new Connection({
      fromUserId : user._id,
      toUserId : toUserId,
    });

    await connection.save();
    res.status(201).send("Connection Request Sent Successfully");



  }catch(error){
    return res.status(500).send(error.message);
  }


});


connectionRouter.get('/receivedRequests', userAuth, async (req , res) =>{

  try{

    const user = req.user;

    const receivedRequests = await Connection.find({toUserId : user._id, status:'pending'});

    const detailedRequests = [];

    

    for(let request of receivedRequests){
      const fromUser = await User.findById(request.fromUserId);

      console.log(fromUser);

      detailedRequests.push({
        requestId : request._id,
        fromUserId : request.fromUserId,
        fromUserName : `${fromUser.firstName} ${fromUser.lastName}`, 
        status : request.status,
        sentAt : request.createdAt
      });

    }

    res.status(200).send(detailedRequests);

  }catch(error){
    return res.status(500).send(error.message);
  }

});


connectionRouter.patch('/respondRequest/:request_id',userAuth, async (req, res) =>{

  try{

    const user = req.user;
    const requestId = req.params.request_id;
    const { action } = req.body;

    const receivedRequests = await Connection.find({toUserId : user._id, status:'pending'});

    const request = await Connection.findById(requestId);

    if(!request){
      throw new Error("Connection Request not found");
    }

    if(['accepted','rejected'].includes(request.status)){
      throw new Error("Connection Request already responded");
    }

    if(request.status !== 'pending'){
      throw new Error("No Connection Request Pending");
    }

    const status = request.status;

    console.log(status);

    if(['accepted','rejected'].includes(status.toLowerCase())){
      throw new Error("Invalid status value");
    }

    request.status = status.toLowerCase();

    const fromUser = await User.findById(request.fromUserId);

    request.status = action === 'accepted' ? 'accepted' : 'rejected';

    await request.save();

    res.status(201).send('Connection Request of ' + fromUser.firstName + ' ' + fromUser.lastName + ' ' + ' ' + ' ' + 'has been ' + request.status );

  }catch(error){
    return res.status(500).send(error.message);
  }

});


connectionRouter.get(('/getConnections'),userAuth,async (req, res) =>{
  try{
    const user = req.user;

    const CurrentConnections = await Connection.find({
      $or:[
        {fromUserId : user._id, status:'accepted'},
        {toUserId : user._id, status:'accepted'}
      ]
    });

    if(CurrentConnections.length === 0){
      throw new Error("You have no connections yet");
    }

    res.status(200).send({count: CurrentConnections.length});
    
    

  }catch(error){
    return res.status(500).send(error.message);
  }
});


module.exports = connectionRouter;



