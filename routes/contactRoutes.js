const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Get all contacts" });
});

router.route("/:id").get((req, res) => {
  res.status(200).json({ message: "Get a contact" });
});

router.route("/").post((req, res) => {
  res.status(200).json({ message: "Posted a contact" });
});

router.route("/:id").put((req, res) => {
  res.status(200).json({ message: "Updated a contact" });
});

router.route("/:id").delete((req, res) => {
  res.status(200).json({ message: "Deleted a contact" });
});

module.exports = router;
