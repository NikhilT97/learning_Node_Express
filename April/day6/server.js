const express = require("express");
const app = express();
const port = 3000;
let fs = require("fs");
const TodoRouter = require("./routes/todoRoutes");


app.use(express.json());

app.get("/home", (req, res) => {
  res.json({ message: "home route" });
});
app.use("/todos",TodoRouter)


app.listen(port, () => {
  console.log(`server started port number : ${port}`);
});
