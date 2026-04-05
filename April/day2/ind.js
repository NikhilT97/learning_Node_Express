const express = require("express");

const app = express();
const port = 5000;

app.get("/home", (req, res) => {
  res.send("This is the HomePage");
});

app.get("/math", (req, res) => {
  let num = Math.random().toFixed(2) * 100;
  res.send(`${num} is random number`);
});

app.listen(port, () => {
  console.log(`server started with port ${5000}`);
});
