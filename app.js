const bodyParser = require('body-parser');
const app = require('express')();
const { userRouter } = require('./routes/user');
const { debateRouter } = require('./routes/debate');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/ping', (req, res) => {

    res.status(200)
    res.json({
        'msg':"pong"
    })
})

app.use('/user', userRouter);
app.use('/debate', debateRouter);


module.exports = {app ,}