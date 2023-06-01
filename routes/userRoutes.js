const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userControllers");
const validateToken = require("../middlewares/validateToken");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

//this would be a private route while the above would be public
router.get("/current", validateToken, currentUser);

module.exports = router;
