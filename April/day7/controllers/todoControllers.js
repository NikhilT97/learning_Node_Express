const fs = require("fs");

const { getData, addOrUpdate } = require("../models/todoModels");

const listTodos = (req, res) => {
  //   let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let data = getData().data;

//   console.log("data =>", data);

  let todos = data.todos;

  res.json({ message: "todo list", todos: todos });
};

const addTodos = (req, res) => {
  let userTodo = req.body;

  //   let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let data = getData().data;
  let todos = data.todos;

  let id = todos[todos.length - 1].id + 1;

  let addTodo = { ...userTodo, id };

  todos.push(addTodo);
  //   fs.writeFileSync("./db.json", JSON.stringify(data));
  addOrUpdate(data);
//   console.log(userTodo);
  res.json({ message: "todo added", todos: data });
};
const updateTodos = (req, res) => {
  let { id } = req.params;

  //   let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let data = getData().data;
  let todos = data.todos;

  const foundIndex = todos.findIndex((el) => el.id == id);

  if (foundIndex == -1) {
    res.json({ message: "inapropriate request" });
  } else {
    let updateTodo = todos.map((todo) => {
      if (todo.id == id) {
        return { ...todo, ...req.body };
      } else {
        return todo;
      }
    });
    data.todos = updateTodo;

    // fs.writeFileSync("/db.json", JSON.stringify(data));
    addOrUpdate(data);
    res.json({ message: "todo updated", list: updateTodo });
  }
};

const deleteTodos = (req, res) => {
  let { id } = req.params;

  //   let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let data = getData().data;
  let todos = data.todos;

  let foundIndex = todos.findIndex((todo) => todo.id == id);

  if (foundIndex == -1) {
    res.json({ message: "invalid request" });
  } else {
    let deleteTodo = todos.filter((todo) => todo.id != id);

    data.todos = deleteTodo;

    // fs.writeFileSync("./db.json", JSON.stringify(data));
    addOrUpdate(data);
    res.json({ message: "todo deleted" });
  }
};

const searchQuery = (req, res) => {
  // console.log(req.query)
  let title = req.query.title;
  let desc = req.query.desc;

//   const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    const data = getData().data;

  if (title) {
    let queryRes = data.todos.filter(
      (todo) => todo.title.includes(title)
    );
    res.json({ message: "hi", searched: queryRes });
  } else {
    res.json({ message: "data", todos:data.todos });
  }
}
 
module.exports = { listTodos, addTodos, updateTodos, deleteTodos, searchQuery };
