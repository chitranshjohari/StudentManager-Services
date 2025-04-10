const express =require("express");
const app =express();


const { mongoose } = require("mongoose")
const port=5000;

app.use('/admin',)



mongoose.connect('mongodb://localhost:27017/StudenManager').then(()=>{
  console.log("connected to DataBase");
})












app.listen(port,()=>{
  console.log(`server is running on port ${port}`);
})