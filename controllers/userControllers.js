const asyncHandler = require("express-async-handler");


const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: "Registered an user" });
});

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Logged in an user" });
});

//this would be a private route while the above would be public
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user" });
});

module.exports = {registerUser, loginUser, currentUser};