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

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5b5a602eaf5db681997acf9e")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then( (res) => {
    //     console.log(res);
    // })

    db.collection('Users').findOneAndUpdate({
        name: "Jen"
    },{
        $set: {
            name: "Chris",
            location: "Glogow"
        },
        $inc: {
            age: 9
        }
        
    },{
        returnOriginal: false
    }).then( (res) => {
        console.log(res);
    }).catch( (err) => {
        console.log(err);
    })

    client.close();
})