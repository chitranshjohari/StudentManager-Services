const User =require('../models/UserSchema');
const admin=require('../models/AdminSchmea');

module.exports={

  addAdmin:async(req,res)=>{
    try{
     const admindata=req.body;
     console.log("Admin Data"+admindata);
    const addAdminData = await admin.create({
      name:admindata.name,
      email:admindata.email,
      phoneNumber:admindata.phoneNumber,
      password:admindata.password
    })
    console.log("data of the admin is"+JSON.stringify(addAdminData));
    res.status(200).send("Admin Created Sucessfully")

    }catch(error){
      res.status(500).send({message: error.message})
    }

  },


  addStudent:async(req,res)=>{
    try{
      const studentdata=req.body;
      console.log("Student Data"+studentdata);
      const Student=await User.create({
        name:studentdata.name,
        email:studentdata.email,
        password:studentdata.password,
        phoneNumber:admindata.phoneNumber,
      
      })

    }catch(error){
      res.status(500).send({message: error.message})
    }

  }

}