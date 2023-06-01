const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

//this would be a private route while the above would be public
router.post("/current", currentUser);

module.exports = router;
