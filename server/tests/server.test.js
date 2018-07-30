var request = require('supertest');
var expect = require('expect');
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
        text: "Second test todo",
        completed: true,
        completedAt: 333
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

describe('DELETE /todos/:id', () => {
    var id = todos[0]._id.toHexString();

    it('should send 404 if id is invalid', (done) => {
        request(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done)
    })

    it('should send 404 if todo doesnt exist', (done) => {
        request(app)
        .delete(`/todos/${(new ObjectID()).toHexString}`)
        .expect(404)
        .end(done)
    })

    it('should delete and return a todo by id', (done) =>{
        request(app)
        .delete(`/todos/${id}`)
        .expect(200)
        .expect( (res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end( (err, res) => {
            if(err){
                return done(err)
            }

            Todo.findById(id).then( (todo) => {
                expect(todo).toNotExist;
                done();
            }).catch((e) =>{
                return done(e);
            })
        });
    })
})

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        //grab id of first item
        //update text, set completed true
        //200
        //text is changed, completed true, completedAt is a number
        var id = todos[0]._id.toHexString();
        var text = 'Changed text';

        request(app)
        .patch('/todos/' + id)
        .send({text: text, completed: true})
        .expect(200)
        .expect( (res) => {
            var todo = res.body.todo;
            expect(todo.text).toBe(text);
            expect(todo.completed).toBe(true);
            expect(typeof todo.completedAt).toBe('number');
        })
        .end(done)
    })

    it('should clear completedAt when todo is not completed', (done) =>{
        //grab id of second item
        //update text, set completed false
        //200
        //text is changed, completed false, completedAt is null
        var text = 'Changed text 2';
        var id = todos[1]._id.toHexString();

        request(app)
        .patch('/todos/' + id)
        .send({text: text, completed: false})
        .expect(200)
        .expect( (res) => {
            var todo = res.body.todo;
            expect(todo.text).toBe(text);
            expect(todo.completed).toBe(false);
            expect(todo.completedAt).toNotExist;
        })
        .end(done)

    })
})
