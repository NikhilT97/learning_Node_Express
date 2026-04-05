const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

//middleware so that we can read the sent data
app.use(express.json());

app.get("/allTodos", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  res.json({ message: "todos list", todos });
});

//post request
app.post("/addTodos", (req, res) => {
  let userTodo = req.body;

  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8")); //reading existing db
  let todos = data.todos;
  let id = todos[todos.length - 1].id + 1; //last id
  console.log("ye id hai", id);
  let addTodos = { ...req.body, id }; // puting id into the {} object and
  todos.push(addTodos); //pushing id to array
  fs.writeFileSync("./db.json", JSON.stringify(data)); // updating the data
  console.log(todos);

  res.json({ message: "todo added" });
});

// update request

app.patch("/updateTodos/:todoId", (req, res) => {
  let { todoId } = req.params;

  //   console.log("todoId =>", todoId, req.params.todoId);
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;

  //check weather id exhist
  let foundId = todos.findIndex((el) => el.id == todoId);

  //if id not found
  if (foundId == -1) {
    res.json({ message: "nahi mila bhai id" });
  } else {
    //id found catch the id from the todo open the todo and update that todo

    let updateTodo = todos.map((todo) => {
      if (todo.id == todoId) {
        return { ...todo, ...req.body };
      } else {
        return todo;
      }
    });

    data.todos = updateTodo;

    fs.writeFileSync("./db.json", JSON.stringify(data));

    res.json({ message: "todo updated here" });
  }
  res.json({ message: "todos updated" });
});

app.delete("/deleteTodos/:todoId", (req, res) => {
  let { todoId } = req.params;

  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8")); //read db
  let todos = data.todos;

  let foundIndex = todos.findIndex((el) => el.id == todoId);

  if (foundIndex == -1) {
    res.json({ message: "index not found" });
  } else {
    let filterTodo = todos.filter((el) => el.id != todoId);

    data.todos = filterTodo;

    fs.writeFileSync("./db.json", JSON.stringify(data));
  }

  res.json({ message: "todo deleted" });
});

app.listen(port, () => {
  console.log(`Port started with ${port} number`);
});
