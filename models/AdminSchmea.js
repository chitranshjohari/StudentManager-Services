const {mongoose, model}=require('mongoose');
const bcrypt = require('bcrypt');
const {createTokenforUser} =require("../utils/authservice")

const AdminSchema= new mongoose.Schema({
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
 password:{
  type:String,
  required:true
 },
 hashedPassword:{
  type:String,
 },
 role:{
  type:String,
  default:"Admin"
 },




}, {timestamps:true}  )

AdminSchema.pre('save',async function(next){
try{
  console.log("pre is called or not ")
 if(!this.isModified('password')){
  console.log("password is not modified")
  return next();
 }
 const salt=bcrypt.genSaltSync(10);
 const hashedPassword=bcrypt.hashSync(this.password, salt);
 this.hashedPassword=hashedPassword;
 return next();
}catch(error){
  return next(error);
}

});


AdminSchema.statics.GenerateTokenAndPasswordCheck = async function (email, password) {
  try {
      // Find user by email
      console.log("GenerateTokenAndPassworedCheck is called ")
      const user = await this.findOne({ email });
      if (!user) throw new Error('User Not Found'); // Throw error if user not found

       console.log("checking match ")
      const isMatch = await bcrypt.compare(password, user.hashedPassword);
      if (isMatch) {
        const token =createTokenforUser(user);
        return token;
      } else {
        console.log("not match")
          throw new Error("Invalid password"); // Properly throwing an error for incorrect password
      }
  } catch (error) {
      throw new Error("Error in password matching: " + error.message);
  }
};


const Admin=model("Admin",AdminSchema);
module.exports=Admin;