//here code which interacts with database will come here
const fs = require("fs");

const getData = () => {
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;

  return { data, todos };
};

const addOrUpdate = (data) => {
  fs.writeFileSync("./db.json", JSON.stringify(data));
};



module.exports = { getData, addOrUpdate };
