const {mongoose}=require('mongoose');

const UserSchema= new mongoose.schema({
 name:{
  type:String,
  required:true,

 },
 email:{
  type:String,
  required:true,
 },
 phoneNumber:{
  type:number,
 },
 password:{
  type:String,
  required:true
 },
 role:{
  type:String,
  default:"Stduent"
 },




}, {timeStamps:true}  )
const User=model("User",UserSchema);
module.exports=User;