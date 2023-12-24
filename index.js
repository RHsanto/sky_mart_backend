// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = 8000;
const app = express();
const auth = require("./modules/user/userRoutes");
const product = require("./modules/product/productRoutes");



// initializations
app.use(express.static("."));
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mr-travel-app.aqkf7.mongodb.net/RHinfo?retryWrites=true&w=majority`
  )
  .then(() => console.log("database connection successful"))
  .catch(err => console.log(err.message));

// Routers here
app.use("/auth", auth);
app.use(product)


app.get("/", (req, res) => {
  res.send("Running the server on sky mart  App");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
