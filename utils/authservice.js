const Jwt=require("jsonwebtoken");

const secret="$vega@007";

function createTokenforUser(user){
  const payload={
   _id:user._id,
   name:user.name,
   email:user.email,
   role:user.role
  }
  const token=Jwt.sign(payload,secret);
  console.log("Token inside the createTokenForUser"+token)
     return token;
}

function validateToken(token){
  // console.log("token"+token);
  const payload=Jwt.verify(token,secret);
  // console.log("payload"+JSON.stringify(payload))
  return payload;

}
module.exports={
  createTokenforUser,
  validateToken
}