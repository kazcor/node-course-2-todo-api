
//env config
var config = require('./config/config.js');
//libs
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
//local
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();
var port = process.env.PORT;

//allows to send JSON to express {text: "smth"} etc
app.use(bodyParser.json());


app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then( (doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos: todos});
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then( (todo) => {
        if (!todo) {
            return res.status(404).send();  
        }

        res.send({todo: todo});
    }, (e) => {
        res.status(400).send(e);
    })
})

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then( (todo) => {
        if(!res){
           return res.status(404).send();
        }
        return res.send({todo: todo});
    }).catch( (e) => {
        res.status(400).send(e);
    })
})

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    //only pick the params user is allowed to update
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    //if user sets completed to true get a timestamp
    //otherwise set it to false and time to null
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set: body,}, {new: true}).then( (todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo: todo});
    }).catch( (e) => {
        return res.status(400).send();
    })
})


app.listen(port, () =>{
    console.log('Started on port ' + port);
})

module.exports = {app};