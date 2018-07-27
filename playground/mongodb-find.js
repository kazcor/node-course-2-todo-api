// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();

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

    // db.collection('Todos').find({
    //     _id: new ObjectID("5b5a5b6c5ee6bf1f5085fae0")
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch', err);
    // });


    // db.collection('Todos').find({
    //     _id: new ObjectID()
    // }).count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch', err);
    // });

    db.collection('Users').find({
        name: "Mike"
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch', err);
    });

    client.close();
})