const mongoose = require('mongoose')

const connectDB = () => {
    
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("failed to connect to db");
  });
  
}

module.exports = {connectDB};