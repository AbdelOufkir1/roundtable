const bodyParser = require('body-parser');
const app = require('express')();
const cors = require('cors');
const { userRouter } = require('./routes/user');
const { supportersRouter } = require('./routes/supporters');
const { debatersRouter } = require('./routes/debaters');
const { debateRouter } = require('./routes/debate');
const { postsRouter } = require('./routes/posts');
const { discussionsRouter } = require('./routes/discussions');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/ping', (req, res) => {

    res.status(200)
    res.json({
        'msg':"pong"
    })
})

app.use('/user', userRouter);
app.use('/user/supporters', supportersRouter);
app.use('/user/debaters', debatersRouter);
app.use('/debate', debateRouter);
app.use('/debate/posts', postsRouter);
app.use('/debate/discussions', discussionsRouter);




module.exports = {app ,}