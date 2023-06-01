const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//we accept username, email and password to register an user.
//However we cannot just store the password raw, we have to hash it before storing
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  //hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("Hashed password: ", hashedPassword);

  //create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User created: ${user}`);

  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data unvailable");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Logged in an user" });
});

//this would be a private route while the above would be public
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user" });
});

module.exports = { registerUser, loginUser, currentUser };
