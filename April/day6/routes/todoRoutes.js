const express = require("express");
const fs = require("fs");
const { getData, addOrUpdateTodos } = require("../models/todoModels");
const {
  alltodos,
  todoQuery,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers");

const TodoRouter = express.Router();

TodoRouter.get("/allTodos", alltodos);

// get by req.query
TodoRouter.get("/todo-query", todoQuery);

//post - post the request to the backend
TodoRouter.post("/add-todo", addTodo);

//patch - update into todo item
TodoRouter.patch("/update-todo/:todoId", updateTodo);

//delete - delete the todo item
TodoRouter.delete("/delete-todo/:todoId", deleteTodo);

module.exports = TodoRouter;
