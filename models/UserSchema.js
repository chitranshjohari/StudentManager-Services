const {mongoose ,model}=require('mongoose');

const UserSchema= new mongoose.Schema({
 name:{
  type:String,
  required:true,

 },
 email:{
  type:String,
  required:true,
 },
 phoneNumber:{
  type:Number,
 },

 role:{
  type:String,
  default:"Stduent"
 },




}, {timestamps:true}  )
const User=model("User",UserSchema);
module.exports=User;