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
    userServices.getAllUsers()
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

    const { name, firebase_uid, email, image  } = req.body;

    userServices.createUser(name, firebase_uid, email, image)
        .then(() => {
            res.status(200)
            res.json({
                'success': `user named ${name} was successfully created`
            })
        })
            .catch(err => {
                res.status(400)
                console.log(err)
                res.json(err.toString())
      })
})

userRouter.get('/', (req, res) => {
    console.log("MADE IT TO get params")

    const { fbuid } = req.query;
    console.log("fbuid ", fbuid)

    userServices.getUser(fbuid)
        .then((data) => {
            res.status(200)
            res.json(data)
        })
        .catch(err => {
            console.log('error in get req: ', err)
            res.status(400)
            res.json(err)
        })
})

// userRouter.get('/:id', (req, res) => {
//     console.log("MADE IT TO get params")

//     const { id } = req.query;

//     console.log('id is heeere: ', id)

//     userServices.getUser(id)
//         .then((data) => {
//             res.status(200)
//             res.json(data)
//         })
//         .catch(err => {
//             res.status(400)
//             res.json(err)
//         })
// })

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


module.exports = { userRouter };