const mongoose = require('mongoose')


const connect2DB = ()=>{
    //connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("failed to connect", err);
  });


}


module.exports = connect2DB;