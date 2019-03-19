const express = require('express');
const userRouter = express.Router();
const userServices = require('../services/user');

userRouter.get('/ping', (req,res) => {
    res.json({
        'msg': "made it to the user services routes"
    })
})

userRouter.post('/', (req, res) => {

    const {name, password, email} = req.body;

    userServices.createUser(name, password, email)    
        .then(() => {
            res.json({
                'success': `user named ${name} was successfully created`
            })
            .catch(err => {
                res.json(err.toString())
            })
        })
})  

userRouter.get('/:id', (req, res) => {
    console.log("MADE IT TO get params")

    const {id} = req.params;

    console.log('id is heeere: ', id)

    userServices.getUser(id)
        .then((data) => {
            res.json(data)
        })
        .catch(err => {
            res.json(err.toString())
        })
})

userRouter.put('/:id', (req, res) => {
    
    const {id} = req.params;
    const {name, email, password, bio} = req.body;
    console.log('id is: ', id)
    console.log('name: ', name, email, password, bio);

    userServices.updateUser(id, name, email, password, bio)  
        .then( ()=> {
            res.json({
                'success': `user's infos with id:${id} have been updated`,
            })
        })
        .catch(err => {
            res.json(err.toString())
        })
})

module.exports = userRouter;