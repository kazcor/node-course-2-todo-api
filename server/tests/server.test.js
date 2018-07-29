var request = require('supertest');
var expect = require('expect');
var mocha = require('mocha');
var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const {ObjectID} = require('mongodb');

const todos = [
    {
        _id: new ObjectID(),
        text: "First test todo"
    },
    {
        _id: new ObjectID(),
        text: "Second test todo"
    }
]

beforeEach( (done) => {
    Todo.remove({}).then( () => {
        return Todo.insertMany(todos);
    }).then( () => done());

})

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
        
        request(app)
        .post('/todos')
        .send({text: text})
        .expect(200)
        .expect( (res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.find({text: text}).then( (todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch( (e) => done(e) );
        })
    })

    it('should not create a todo with invalid data', (done) => {

        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end( (err, res) => {
            if(err) {
                return done(err);
            }

            Todo.find().then( (todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        })
    })
})

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect( (res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
})

describe('GET /todos:id', () => {
    var id = todos[0]._id.toHexString();

    it('should send a 404 when ID is invalid', (done) => {
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .expect( (res) => {
            expect(res.body).toNotExist;
        })
        .end(done)
    })

    it('should send a 404 when ID couldnt be found', (done) => {
        request(app)
        .get(`/todos/${(new ObjectID()).toHexString}`)
        .expect(404)
        .expect( (res) => {
            expect(res.body).toNotExist;
        })
        .end(done)
    })

    it('should get a todo by ID', (done) => {
        request(app)
        .get(`/todos/${id}`)
        .expect(200)
        .expect( (res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    })
})
