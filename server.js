const express = require("express");
const app = express();
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;

app.listen(() => {
  console.log(`Listening on port ${port}`);
});
