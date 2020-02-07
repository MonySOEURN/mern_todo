const express = require('express');
const todoRoutes = express.Router();

// get models
const Todo = require('./../models/todo.model');
const auth = require('./../middleware/auth.middlware');


// @route GET  todos/
// @desc Recieve all todo items
// @access Public
todoRoutes.get('/', (req, res) =>{
    Todo.find(function(err, todos){
        if(err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

// @route GET  todos/
// @desc Find specific todo item
// @access Public
todoRoutes.get('/:id', (req, res) => {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

// @route POST  todos/
// @desc Add new todo item
// @access Private
todoRoutes.post('/', auth, (req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({ "todo": "todo added successfully!"});
        })
        .catch(err => {
            res.status(400).json({ "todo": 'adding new todo failed!'});
        });
});

// @route POST  todos/
// @desc update specific todo item
// @access Public
todoRoutes.post('/:id', (req, res) => {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        if(!todo)
            res.status(400).json({ "todo": 'data is not found!'});
        else 
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json("todo updated!");
            })
            .catch(err => {
                res.status(400).json({ "todo": "update not possible!"});
            });
    });
}); 

// @route DELETE  todos/delete
// @desc Delete specific todo item
// @access Private
todoRoutes.delete('/:id', auth,(req, res) => {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        if(!todo)
            res.status(400).json({ "todo": 'can not delete data, data not found!'});
        else 
            todo.delete().then(todo => {
                res.json("todo deleted.");
            })
            .catch( err => {
                res.status(400).json({ "todo": "deleting failded!."});
            });
    });
});

module.exports = todoRoutes;