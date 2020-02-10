const express = require('express');
const app = express();

// this package will be remove (to remove: npm remove body-parser) (to install: npm install body-parser)
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;
const path = require('path');


// implemented file
const config = require('config');
const auth = require('./middleware/auth.middlware');

// get models
// let Todo = require('./models/todo.model');

const User = require('./api/users.api');
const Auth = require('./api/auth.api');
const Todo = require('./api/todo.api');
const Item = require('./api/item.api');

// db config
// const db = config.get('cloudMongoURI');
const db = config.get('localMongoURI');

app.use(cors());

app.use(express.json());

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const connection = mongoose.connection;

// serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('./../mern-todo-app-s.mony/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

connection.once('open', function(){
    console.log("mongo db connection establish successfully")
});

// use routes
app.use('/api/items', Item);
app.use('/api/users', User);
app.use('/api/auth', Auth);
app.use('/todos', Todo);

app.listen(PORT, function(){
    console.log("server is running on port:" + PORT);
});