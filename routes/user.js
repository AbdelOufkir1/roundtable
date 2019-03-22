const express = require('express');
const userRouter = express.Router();
const { userServices } = require('../services/user');


userRouter.get('/ping', (req, res) => {
    res.json({
        'msg': "Pong in UserRouter"
    })
})

userRouter.get('/allusers', (req, res) => {
    console.log('IN GET ALL USERS')
    userServices.getAllUsers(arg)
        .then(data => {
            res.status(200);
            res.json(data)
        })
        .catch(err =>{
            res.status(400);
            res.json(err.toString())
        })
})

userRouter.post('/', (req, res) => {

    const { name, password, email, bio } = req.body;

    userServices.createUser(name, password, email, bio)
        .then(() => {
            res.status(200)
            res.json({
                'success': `user named ${name} was successfully created`
            })
            .catch(err => {
                res.status(400)
                res.json(err.toString())
            })
    })
})

userRouter.get('/:id', (req, res) => {
    console.log("MADE IT TO get params")

    const { id } = req.params;

    console.log('id is heeere: ', id)

    userServices.getUser(id)
        .then((data) => {
            res.status(200)
            res.json(data)
        })
        .catch(err => {
            res.status(400)
            res.json(err)
        })
})

userRouter.put('/:id', (req, res) => {

    const { id } = req.params;
    const { name, email, password, bio } = req.body;
    console.log('name is : ', name)
    console.log('info: ', id, email, password, bio);


    userServices.updateUser(id, name, email, password, bio)
        .then(() => {
            res.status(200)
            res.json({
                'success': `user's infos with id:${id} have been updated`,
            })
        })
        .catch(err => {
            res.status(400)
            res.json(err.toString())
        })
})

userRouter.delete('/:name', (req, res) => {

    const { name } = req.params;
    console.log(name)

    userServices.deleteUser(name)
        .then(() => {
            res.status(200)
            res.json({
                "success": `user named ${name} has been deleted`
            })
        })
        .catch(err => {
            res.status(400)
            res.json(err.toString())
        })
})

userRouter.post('/:id/addSupporter', (req,res) => {
    const { id } = req.params;
    const { supporterId } = req.body;

    userServices.addSupporter(id, supporterId)
        .then(() => {
            res.status(200)
            res.json({
                "success": `supporter has been added`
            })
        })
        .catch(err => {
            res.status(400)
            res.json(err.toString())
        })
})

userRouter.get('/:id/supporters', (req, res) => {

    const {id} = req.params;

    userServices.getSupporters(id)
        .then(data => {
            res.status(200)
            res.json(data)
        })
        .catch(err =>{
            res.status(400)
            res.json(err.toString())
        })
})

userRouter.delete('/:id/removeSupporter', (req, res) => {

    const { id } = req.params;
    const { supporterId } = req.body;
    
    userServices.removeSupporter(id, supporterId)
        .then(() => {
            res.status(200)
            res.json({
                "success" : "supporter has been removed"
            })
        } , err => {
            console.log(err)
            res.status(400)
            res.json(err.toString)
        })
        .catch((err) => {
            res.status(400)
            res.json(err.toString())
        })
})

userRouter.post('/:id/addDebater', (req,res) => {
    const { id } = req.params;
    const { debaterId } = req.body;

    userServices.addDebater(id, debaterId)
        .then(() => {
            res.status(200)
            res.json({
                "success": `debater has been added`
            })
        })
        .catch(err => {
            res.status(400)
            res.json(err.toString())
        })
})

userRouter.get('/:id/debaters', (req, res) => {

    const {id} = req.params;

    userServices.getDebaters(id)
        .then(data => {
            res.status(200)
            res.json(data)
        })
        .catch(err => {
            res.status(400)
            res.json(err.toString())
        })
})


module.exports = { userRouter };