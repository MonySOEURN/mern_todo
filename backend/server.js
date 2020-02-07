const express = require('express');
const app = express();

// this package will be remove (to remove: npm remove body-parser) (to install: npm install body-parser)
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;


// implemented file
const config = require('config');
const auth = require('./middleware/auth.middlware');

// get models
// let Todo = require('./models/todo.model');

const User = require('./api/users.api');
const Auth = require('./api/auth.api');
const Todo = require('./api/todo.api');

// db config
const db = config.get('cloudMongoURI');

app.use(cors());

app.use(express.json());

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', function(){
    console.log("mongo db connection establish successfully")
});

// todoRoutes.route('/').get(function(req, res){
//     Todo.find(function(err, todos){
//         if(err) {
//             console.log(err);
//         } else {
//             res.json(todos);
//         }
//     });
// });

// todoRoutes.route('/:id').get(function(req, res) {
//     let id = req.params.id;
//     Todo.findById(id, function(err, todo) {
//         res.json(todo);
//     });
// });

// todoRoutes.route('/add').post(function( auth, req, res) {
//     let todo = new Todo(req.body);
//     todo.save()
//         .then(todo => {
//             res.status(200).json({ "todo": "todo added successfully!"});
//         })
//         .catch(err => {
//             res.status(400).send('adding new todo failed!');
//         });
// });

// todoRoutes.route('/update/:id').post(function(req, res) {
//     let id = req.params.id;
//     Todo.findById(id, function(err, todo) {
//         if(!todo)
//             res.status(400).send('data is not found!');
//         else 
//             todo.todo_description = req.body.todo_description;
//             todo.todo_responsible = req.body.todo_responsible;
//             todo.todo_priority = req.body.todo_priority;
//             todo.todo_completed = req.body.todo_completed;

//             todo.save().then(todo => {
//                 res.json("todo updated!");
//             })
//             .catch(err => {
//                 res.status(400).send("update not possible!");
//             });
//     });
// }); 

// todoRoutes.route('/delete/:id').delete(function(req, res) {
//     let id = req.params.id;
//     Todo.findById(id, function(err, todo) {
//         if(!todo)
//             res.status(400).send('can not delete data, data not found!');
//         else 
//             todo.delete().then(todo => {
//                 res.json("todo deleted.");
//             })
//             .catch( err => {
//                 res.status(400).send("deleting failded!.");
//             });
//     });
// });

// use routes
app.use('/api/users', User);
app.use('/api/auth', Auth);
app.use('/todos', Todo);

app.listen(PORT, function(){
    console.log("server is running on port:" + PORT);
});