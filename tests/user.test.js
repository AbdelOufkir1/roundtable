const request = require('supertest');
jest.mock('../services/user');
const {app} = require('../app');
const db = require('../services/db')();
jest.mock('../services/db');
const userServices = require('../services/user');

test('when making GET request to /ping we expect {"msg":"pong"}', done => {
    request(app)
        .get('/ping')
        .then(response => {
            expect(response.body).toEqual({"msg": "pong"})
            done() 
        })
        .catch(err => {
            done();
        })
})   

test('when making a GET reqest to /ping we expect {"msg":"pong in userRouter}', done => {
    request(app)
        .get('/user/ping')
        .then(response => {
            done();
            expect(response.body).toEqual({"msg":"Pong in UserRouter"})
        })
        .catch(err => {
            done();
        })
})

