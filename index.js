const express =require("express");
const app =express();
const Admin=require('./models/AdminSchmea');

const cors=require('cors');

app.use(cors());


const { mongoose } = require("mongoose")

mongoose.connect('mongodb://localhost:27017/StudenManager').then(async()=>{
  console.log("connected to DataBase");
  const exisistingAdmin = await Admin.findOne({'email':"Admin@vel.com"});
  if(!exisistingAdmin){
    const newAdmin = Admin({
      name:"Admin",
      email:"Admin@vel.com",
      password:"123456",
    
    })
   newAdmin.save();
   console.log("admin added successfully");
  }
})  .catch((err) => {
  console.error("Database connection error:", err);
});



const port=5000;

app.use(express.json()); // <-- make sure to parse incoming JSON


app.post('/login',async(req,res)=>{
  try{
    const {email,password} =req.body();
    console.log("email"+email);
    console.log("password"+password);
    const token = await Admin.GenerateTokenAndPasswordCheck(email,password);

    console.log(token);

  }catch(error){
    res.send(500).json("Internal Server Error")
  }

})

app.post('/user',()=>{
  console.log("user route is called ");
});















app.listen(port,()=>{
  console.log(`server is running on port ${port}`);
})