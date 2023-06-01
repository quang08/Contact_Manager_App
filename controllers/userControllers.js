const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  //receive info
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  //retrieve user to compare
  const user = await User.findOne({ email });

  //compare passwords
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password not valid");
  }
});

//this would be a private route while the above would be public
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
