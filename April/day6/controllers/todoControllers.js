const express = require("express");
const { getData, addOrUpdateTodos } = require("../models/todoModels");

const alltodos = (req, res) => {
  //   let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let data = getData().data;
  console.log(data);
  let todos = data.todos;

  res.json({ message: "todo list", todos });
};

const todoQuery = (req, res) => {
  let title = req.query.title;

  //   let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let data = getData().data;
  //if query provided then show by query else show full data

  if (title) {
    let queryTodo = data.todos.filter((el) => el.title.includes(title));
    res.json({ message: "todo list by query", queryTodos: queryTodo });
  } else {
    res.json({ message: "todo list", queryTodos: data.todos });
  }
};

const addTodo = (req, res) => {
  let userTodo = req.body;
  //   let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let data = getData().data;

  let todos = data.todos;

  let id = todos[todos.length - 1].id + 1; //last todo id jo hai usme + 1 add karo
  let addTodo = { ...userTodo, id }; // us object me ...usertodo ko open karo usme ID DALO
  todos.push(addTodo); // todos me push karo addtodo ko

  //   fs.writeFileSync("./db.json", JSON.stringify(data));
  addOrUpdateTodos(data);

  res.json({ message: "todo added" });
};

const updateTodo = (req, res) => {
  let todoId = req.params.todoId;
  let data = getData().data;
  //   let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;

  let foundIndex = todos.findIndex((el) => el.id == todoId);

  if (foundIndex == -1) {
    res.json({ message: "invalid id" });
  } else {
    //if id found
    let updateTodo = todos.map((el) => {
      if (el.id == todoId) {
        return { ...el, ...req.body };
      } else {
        return el;
      }
    });

    data.todos = updateTodo; // tya data madhlya todos array madhe to updated data taka ani
    // fs.writeFileSync("./db.json", JSON.stringify(data)); // to data database madhe update kara
    addOrUpdateTodos(data);
    res.json({ message: "todo patch updated" });
  }

  console.log(todos);

  //   res.json({ message: "todo updated" });
};

const deleteTodo = (req, res) => {
  let todoId = req.params.todoId;

  //   let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let data = getData().data;

  let todos = data.todos;

  let foundIndex = todos.findIndex((el) => el.id == todoId);

  //if index not found
  if (foundIndex == -1) {
    res.json({ message: "id not found please send valid id" });
  } else {
    let deleteTodo = todos.filter((el) => el.id != todoId);
    data.todos = deleteTodo;
    // fs.writeFileSync("./db.json", JSON.stringify(data));
    addOrUpdateTodos(data);
  }

  res.json({ message: "todo delete" });
};

module.exports = { alltodos, todoQuery, addTodo, updateTodo, deleteTodo };
