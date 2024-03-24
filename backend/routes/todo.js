const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo');

router.get('/todo', todoController.getTodos);

router.post('/todo/add', todoController.addTodo);

router.put('/todo/:id', todoController.updateTodo);

router.delete('/todo/:id', todoController.deleteTodo);


module.exports = router;