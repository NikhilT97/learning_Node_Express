//shop.js
const express = require("express");
const app = express();
const { shopRouter } = require("./routes/shopRoutes");
const connectDB = require("./config/shopConfig");
require('dotenv').config() 

app.use(express.json());
app.use('/shop', shopRouter)

app.listen(process.env.PORT, () => {
  console.log("server started shop opened sucessfully");
  connectDB();
});
