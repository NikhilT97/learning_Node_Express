const express = require("express");
const app = express();
const fs = require("fs");
const { TodoRouter } = require("./routes/todoRoutes");
const { logger } = require("./middleware/todoMiddlewares");

app.use(express.json());

app.use(logger); // req chya adhi middleware chalel, ani ha logger middleware ahe tr pratek req ali ki log karen, evdh tyach kam , ankhi 100 diff middleware astil je aplyala use karayche ahet,

app.get("/home", (req, res) => {
  res.json({ message: "this is home" });
});

app.use("/todo", TodoRouter);

app.listen(3111, () => {
  console.log(`server started`);
});

