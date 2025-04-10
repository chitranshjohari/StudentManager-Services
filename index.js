const express =require("express");
const app =express();
const Admin=require('./models/AdminSchmea');
const nodemailer = require('nodemailer');
const User=require('./models/UserSchema')
const cors=require('cors');

app.use(cors());
require('dotenv').config();


const otpStore = {}; // 
const { mongoose } = require("mongoose");
const { checkAuthentication } = require("./middelware/authicationServices");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

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
app.use(express.urlencoded({ extended: true }));
app.use(checkAuthentication("token"))
app.post('/login',async(req,res)=>{
  try{
    console.log("login API is called ")
    const {email,password} =req.body;
    console.log("email"+email);
    console.log("password"+password);
    const token = await Admin.GenerateTokenAndPasswordCheck(email,password);

    res.status(200).json({"Token":token});

  }catch(error){
    res.status(500).json("Internal Server Error")
  }

})

app.post('/user/register', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[email] = {
    otp,
    userData: req.body
  };

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      text: `Your OTP is: ${otp}`
    });

    res.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});


// Verify OTP
app.post('/user/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const data = otpStore[email];
  console.log("data is "+data);
  console.log("otp"+otp);

  if (data && data.otp === otp) {
    try {
      const newUser = new User(data.userData);
      await newUser.save();

      delete otpStore[email]; // Clean up
      res.json({ verified: true, message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ verified: false, message: 'Error saving user' });
    }
  } else {
    res.json({ verified: false, message: 'Invalid OTP' });
  }
});



app.get('/fetchdata', async (req, res) => {
  try {
    console.log("fetchdata is called ");
    const token = req.query.token; // or use req.headers.token / req.body.token based on how you're sending it
    console.log("Token is " + token);

    const data = await User.find({}, { name: 1, email: 1, phoneNumber: 1, _id: 1});
    console.log("userdata is", data);
    
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});












app.listen(port,()=>{
  console.log(`server is running on port ${port}`);
})