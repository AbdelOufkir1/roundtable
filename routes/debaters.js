const express = require('express')
const debatersRouter = express.Router();
const { debatersServices } = require('../services/debaters')


// add a debater
debatersRouter.post('/:id/add', (req,res) => {
    const { id } = req.params;
    const { debaterId } = req.body;

    debatersServices.addDebater(id, debaterId)
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

// get all debaters of a the current user
debatersRouter.get('/:id/list', (req, res) => {

    const {id} = req.params;

    debatersServices.getDebaters(id)
        .then(data => {
            res.status(200)
            res.json(data)
        })
        .catch(err => {
            res.status(400)
            res.json(err.toString())
        })
})

module.exports = {debatersRouter}