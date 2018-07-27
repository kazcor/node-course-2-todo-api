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

    db.collection('Users').deleteMany({name: "Andrew"}).then((res) =>{
        console.log("Deleted " + res.result.n + " users");
    }).catch((err) => {
        console.log(err);
    })

    db.collection('Users').findOneAndDelete({_id: 123}).then((res) =>{
        console.log("Deleted: ");
        console.log(JSON.stringify(res, undefined, 2));
    }).catch((err) => {
        console.log(err);
    })

    client.close();
})