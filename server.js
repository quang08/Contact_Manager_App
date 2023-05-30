const express = require("express");
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");

const port = process.env.PORT || 5000;
const app = express();

//built in body parser, or else req.body would be undefined
app.use(express.json());
//contact routers
app.use("/api/contacts", contactRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
