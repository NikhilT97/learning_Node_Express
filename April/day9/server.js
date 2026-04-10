const express = require('express')
const app = express();
const mongoose = require('mongoose')

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/todo-app').then( ()=> {
    console.log('mongo db connected')
}).catch( (err) => {
    console.log('error occured while connecting to db')
})

let todoSchema = new mongoose.Schema({
    title:String,
    description:String,
    Status:Boolean,
    noOfLikes:Number
})

let TodoModel = mongoose.model("Todo", todoSchema )

app.post("/add-todo", async (req,res) => {
    let {title,description,status,noOfLikes} = req.body
    await TodoModel.create({title,description,status,noOfLikes});
    res.status(201).json({message:"Todo Added"})
})


app.listen(3000, ()=>{
    console.log('server started at port 3000')
})

