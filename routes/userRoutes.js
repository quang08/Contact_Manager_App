const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.json({ message: "Registered an user" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Logged in an user" });
});

router.post("/current", (req, res) => {
  res.json({ message: "Current user" });
});

module.exports = router;
