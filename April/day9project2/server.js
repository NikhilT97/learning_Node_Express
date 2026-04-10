const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { TodoRouter } = require("./router/todoRouter");
const { todoModel } = require("./model/todoModel");
const { connectDB } = require("./config/mongodbConfig");
require('dotenv').config()

app.use(express.json());
app.use("/todo", TodoRouter);

app.listen(process.env.PORT, () => {
  console.log("server started 3000");
  connectDB();
});
