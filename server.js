const express = require("express");
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHander = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");

const port = process.env.PORT || 5000;
const app = express();
connectDb();

//built in body parser middleware, or else req.body would be undefined
app.use(express.json());
//contact routers
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
//custom error handler middleware
app.use(errorHander);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
