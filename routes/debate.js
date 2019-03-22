const express = require('express');
const debateRouter = express.Router();
const {debateServices} = require('../services/debate')

debateRouter.get('/ping', (req, res) => {
    res.json({
        "pong":"in debate's Router"
    })
})

debateRouter.post('/', (req, res) => {

    const {first_debater, second_debater, title, description, category, rules} = req.body;

    debateServices.createDebate(first_debater, second_debater, title, description, category, rules)
        .then(() => {
            res.status(200)
            res.json({
                "msg" : `new debate titled ${title} created`
            })
        })
        .catch(err => {
            res.status(400)
            res.json(err.toString())
        })

})


module.exports = { debateRouter }