const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const { json } = require("stream/consumers");

app.use(express.json()); //express.json() its a function helps us to read the data it's like a middleware

app.get("/todos", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8")); //reading the data using fs module, parsing it to convert json data to normal object
  // console.log(typeof data);
  res.json({ message: "all todos here", todos: data }); //sending data as a response to the user
});

// if we want to add to-do we have to take request form the user to
app.post("/add-todo", (req, res) => {
  let userTodo = req.body; //user ne body madhe je data send kela to accept kkela

  let todoArr = JSON.parse(fs.readFileSync("./db.json", "utf-8")); // master database read kela
  // console.log(todoArr)
  let todos = todoArr.todos; // master object madhun todos array pakadli :[{id:1,title:"ex","desc":"anything"}]
  let id = todos[todos.length - 1].id + 1;
  // console.log(id)

  let tobeUpdated = { ...userTodo, id };
  todos.push(tobeUpdated); // array madhe body madhun alela data push kela ani
  // console.log(todos);

  fs.writeFileSync("./db.json", JSON.stringify(todoArr)); // master array purn update keli db.json madhe array stringify karun
  res.json({ message: "todo added" });
});

// update and delete fakt 2 gosthi aaj deep madhe samjaych ahe, aajch samjaych ahe, mg majja...
app.patch("/update-todo/:todoID", (req, res) => {
  let { todoID } = req.params; // array accepted
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos; // todos array extracted

  let foundIndex = todos.findIndex((el) => el.id == todoID);

  console.log(foundIndex, todoID);
  //if id not found
  if (foundIndex == -1) {
    res.json({
      message: "beta id nahi mila tu jo dhunda wo number bahar wala hai",
    });
  } else {
    // index present hai,

    let updateTodos = todos.map((todo) => {
      if (todo.id == todoID) {
        return { ...todo, ...req.body }; // open that perticular todo and update with my data
      } else {
        return todo;
      }
    });

    data.todos = updateTodos; // finally update the data. which data youll update todos data thats why data.todos

    fs.writeFileSync("./db.json", JSON.stringify(data)); // also update into the database,
    res.json({ message: "todo updated" });
  }
});

// delete Todo
app.delete("/delete-todo/:todoId", (req, res) => {
  let { todoId } = req.params; // take id from the params

  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8")); //  reading db
  let todos = data.todos; //extracting db

  console.log(todos[todoId - 1]);
  let id = todos[todoId - 1]; //id which we need to delete

  let foundIndex = todos.findIndex((el) => el.id == todoId); //check if that id match with existing id

  if (foundIndex == -1) {
    res.json({ message: "invalid request id" }); // id not found
  } else {
    //id mil gaya
    let filteredData = todos.filter((el) => el.id != todoId); // found and filter that id which is chosen to be delete
    data.todos = filteredData; // update into array

    fs.writeFileSync("./db.json", JSON.stringify(data)); //update the database
  }

  res.json({ message: "todo deleted" });
});

app.listen(port, () => {
  console.log(`server started with ${port}`);
});
