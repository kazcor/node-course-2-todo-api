const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

Todo.remove({}).then( (result) => {
    console.log(result);
})

//Todo.findOneAndRemove({})
//Todo.findByIdAndRemove()

Todo.findByIdAndRemove('id').then( (todo)  => {

})