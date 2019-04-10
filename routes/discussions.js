const express = require('express');
const discussionsRouter = express.Router();
const { discussionsServices } = require('../services/discussions');

discussionsRouter.get('/ping', (req, res) => {
    res.json({
        "success":"Pong in discussions' Router "
    })
})

discussionsRouter.post('/:d_id/', (req, res) => {

    const {d_id} = req.params;
    const {user_id, title, body} = req.body;

    discussionsServices.createDiscussion(d_id, user_id, title, body)
        .then(() => {
            res.status(200)
            res.json({
                "success": `discussion titled ${title} has been created`
            })
        })
        .catch(err => {
            res.status(400)
            res.json(err.toString())
        })
})

discussionsRouter.get('/:d_id/all', (req, res) => {

    const {d_id} = req.params;

    discussionsServices.getAllDiscussion(d_id)
        .then(data => {
            res.status(200)
            res.json(data)
        })
        .catch(err => {
            res.status(400)
            res.json(err.toString())
        })
})

discussionsRouter.get('/every', (req, res) => {

    const {d_id} = req.params;

    discussionsServices.getEveryDiscussion(d_id)
        .then(data => {
            res.status(200)
            res.json(data)
        })
        .catch(err => {
            res.status(400)
            res.json(err.toString())
        })
})


module.exports = {discussionsRouter }