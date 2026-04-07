const express = require("express");
const app = express();
const fs = require("fs");
const { TodoRouter } = require("./routes/todoRoutes");

app.use(express.json());

app.get("/home", (req, res) => {
  res.json({ message: "this is home" });
});

app.use('/todo',TodoRouter)

app.listen(3111, () => {
  console.log(`server started`);
});
