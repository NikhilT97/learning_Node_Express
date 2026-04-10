const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { movieRouter } = require("./routes/movieRoutes");
require('dotenv').config()
const connect2DB = require("./config/movieConfig");

app.use(express.json()); //helps us to read json files comming from body
app.use("/movie", movieRouter); //router

app.listen(process.env.PORT, () => {
  console.log("server started @ port 3000");
  connect2DB();
});
