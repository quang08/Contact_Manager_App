const express = require("express");
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");

const port = process.env.PORT || 5000;
const app = express();

app.use("/api/contacts", contactRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
