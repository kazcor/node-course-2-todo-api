//required to hash (playground purpose only)
const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

//takes object and secret
var token = jwt.sign(data,'123abc');

var decoded = jwt.verify(token, '123abc');

console.log('decoded', decoded.toString());




// var message = 'I am user number 3';

// //hashing the message, it's an object, so toString
// var hash =  SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hashed: ${hash}`);

// //this is gonna be user
// var data = {
//     id: 4
// }

// //adding somesecret as 'salting' to prevent users from hashing themselves
// var token = {
//     data: data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// //simulating man in the middle attack (he doesn't have our secret/salt)
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();


// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed! Dont trust');
// }