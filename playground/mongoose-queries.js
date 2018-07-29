const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

var id = "5b5ce63941cc153eb86597a6";
var userId = "5b5b2dd8bf09751b609f0048";

// //find all matching the query
// Todo.find({
//     _id: id
// }).then((todos) => {
//     if(todos.length === 0){
//         return console.log('Id not found');
//     }
//     console.log('Todos', todos);
// })

// //find the first one matching the query
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo', todo);
// })
// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// } else {
//     Todo.findById(id).then( (todo) => {
//         if(!todo){
//             return console.log('Id not found');
//         }
//         console.log('Todo by id', todo);
//     }).catch( (e) => {
//         console.log(e);
//     })
// }

if(!ObjectID.isValid(userId)){
    console.log("Invalid User ID!");
} else {
    User.findById(userId).then( (user) => {
        if(!user){
            return console.log('User not found by id!');
        }

        console.log('User: ', user);
    }).catch( (e) => {
        console.log(e);
    })
}


