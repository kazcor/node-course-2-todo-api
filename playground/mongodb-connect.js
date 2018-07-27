// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);
//ES6 Object destructuring creates variables by pulling object properties
var user = {name: 'andrew', age: 23};
var {name} = user;


//url is where the database lives, 27017 locally
MongoClient.connect( 'mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) =>{
    if (err) {
        return console.log('Unable to connect to database');
    } 
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Do stuff',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert' + text + 'todo');
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    //Insert new doc into Users (name, age, location)

    // db.collection('Users').insertOne({
    //     name: 'UserOne',
    //     age: 12,
    //     location: 'france',
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('error inserting a user');
    //     }

    //     console.log(result.ops[0].getTimeStamp);
    // })

    client.close();
})