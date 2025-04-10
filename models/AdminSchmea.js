const {mongoose, model}=require('mongoose');

const AdminSchema= new mongoose.schema({
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
  default:"Admin"
 },




}, {timeStamps:true}  )

const Admin=model("Admin",AdminSchema);
module.exports=Admin;