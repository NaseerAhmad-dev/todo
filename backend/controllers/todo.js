const fs = require('fs');
const Todo = require('../Models/Todo');

exports.addTodo = async (req, res) => {
  const { todo , status} = req.body;

  try {
    let addTodo = await Todo.addTodo(fs, { todo },status );
    console.log("Add todo ", addTodo);
    let payload = {
      status: "success",
      message: "Todo added successfully",
      id : addTodo
    }
    return res.status(200).json(payload);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message, message: "Internal Server Error" });
  }
}

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.getTodos(fs);

    let payload = {
      status: "success",
      message: "Todo fetched successfully",
      data: todos
    }
    return res.status(200).json(payload);

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message, message: "Internal Server Error" });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { todo ,status } = req.body;

  try {
    await Todo.updateTodo(fs, parseInt(id), { todo,status });
    
    let payload = {
      status: "success",
      message: "Todo updated successfully",
    }
    return res.status(200).json(payload);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message, message: "Internal Server Error" });
  }
}

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.deleteTodo(fs, parseInt(id));
    let payload = {
      status: "success",
      message: "Todo deleted successfully",
    }
    return res.status(200).json(payload);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message, message: "Internal Server Error" });
  }
};