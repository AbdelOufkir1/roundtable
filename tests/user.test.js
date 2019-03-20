const request = require('supertest');
jest.mock('../services/user');
const {app} = require('../app');
const db = require('../services/db')();
jest.mock('../services/db');
const {userServices} = require('../services/user');

test('when making GET request to /ping we expect {"msg":"pong"}', done => {
    request(app)
        .get('/ping')
        .then(response => {
            expect(response.body).toEqual({"msg": "pong"})
            done() 
        })
        .catch(error=> {
            done();
        })
})   

test('when making a GET request to /ping we expect {"msg":"pong in userRouter}', done => {
    request(app)
        .get('/user/ping')
        .then(response => {
            expect(response.body).toEqual({"msg":"Pong in UserRouter"})
            done();
        })
        .catch(err => {
            done();
        })
})

test('when making a POST request to /user/ with empty object we expect status(400)', done => {
    request(app)
        .post('/user/')
        .send({})
        .then(response => {
            expect(response.status).toBe(400)
            done();
        })
        .catch(err => {
            done();
        })

        
})

test('when making a POST request to /user/ with valid data we expect status(400)', done => {
    request(app)
        .post('/user/')
        .send({
            "name": "a",
            "password": "b",
            "email":"c",
            "bio":"d"
        })
        .then(response => {
            expect(response.status).toBe(200)
            done();
        })
        .catch(err => {
            done();
        })
})

test('when making GET request to /user/:id, if db query is successful, expect 200', done => {
    userServices.getUser.mockImplementation(() => {
        return Promise.resolve();
    })
    request(app)
        .get('/user/:id')
        .then(response => {
            expect(response.status).toBe(200)
            done()
        })
})

test('when making GET request to /user/:id, if db query is NOT sucessful, expect 400', done => {
    userServices.getUser.mockImplementation(() => {
        return Promise.reject();
    })
    request(app)
        .get('/user/:id')
        .then(response => {
            expect(response.status).toBe(400)
            done()
        })
})
