const express = require('express');
const { todoModel } = require('../model/todoModel');

const TodoRouter = express.Router();


 TodoRouter.post("/add-todo", async (req, res) => {

    // const { title, description, status, noOfLikes } = req.body;
    let todo = new todoModel(req.body)
    await todo.save();
  res.status(201).json({ message: "Todo Added" });
});

TodoRouter.get("/list-todo", async (req,res) => {
        const todo = await todoModel.find() // find gives whole list
        res.status(200).json({message:"Todo list", todo})
})

TodoRouter.patch("/update-todo/:todoId", async( req,res) => {
                const {todoId} = req.params;
                await todoModel.findByIdAndUpdate(todoId, req.body) // as the name suggests
                res.status(201).json({message:"to do updated"})

})

TodoRouter.delete("/delete-todo/:todoId", async(req,res)=>{
                const {todoId} = req.params;
                await todoModel.findByIdAndDelete(todoId) // as per the name
                res.status(200).json({message:"todo deleted"})
})

module.exports = {TodoRouter}