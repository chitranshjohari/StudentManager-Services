const { validateToken } = require("../utils/authservice"); // Ensure this function exists and is imported properly
const UserModel=require("../models/AdminSchmea")
function checkAuthentication(tokenvalue) {
  return async(req, res, next) => {

    if (!tokenvalue) {
      // console.log("No token found");
      return next(); // Proceed without authentication
    }

    try {
      const payload = validateToken(tokenvalue);
      req.user = payload;
      const user = await UserModel.findById(payload._id); // Assuming payload contains user ID
      if (user) {
        req.user.fullName = user.fullName; // Add fullname if user exists
      }
      // console.log("Authenticated user: " + JSON.stringify(req.user));
      return next(); // Proceed if token is valid
    } catch (error) {
      // console.error("Token validation failed:", error);
      return next(); // Invalid token, proceed without authentication
    }
  };
}

module.exports = { checkAuthentication };