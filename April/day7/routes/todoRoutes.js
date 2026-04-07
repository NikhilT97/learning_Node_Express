const express = require("express");
const TodoRouter = express.Router();

const fs = require("fs");
const { getData, addOrUpdate } = require("../models/todoModels");
const {
  listTodos,
  deleteTodos,
  addTodos,
  updateTodos,
  searchQuery,
} = require("../controllers/todoControllers");

TodoRouter.get("/list", listTodos);

// query params
TodoRouter.get("/search/", searchQuery);


//add todo
TodoRouter.post("/addTodo", addTodos);

//update-todo
TodoRouter.patch("/update-todo/:id", updateTodos);

TodoRouter.delete("/delete-todo/:id", deleteTodos);

module.exports = { TodoRouter };
