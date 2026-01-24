const mongoose = require('mongoose');
const validator = require('validator');


const connectionSchema = new mongoose.Schema({

  fromUserId : {type:mongoose.Schema.Types.ObjectId,ref : "User" , required:true},
  toUserId : {type:mongoose.Schema.Types.ObjectId,ref : "User" , required:true},
  status : {type:String, enum:['accepted','pending','rejected'],required:true,default:'pending'},


},{timestamps:true});


connectionSchema.pre("save", async function () {
 if(this.fromUserId.equals(this.toUserId)){
    throw new Error("Cannot send connection request to yourself");
  }

})


module.exports = mongoose.model('Connection' , connectionSchema);


