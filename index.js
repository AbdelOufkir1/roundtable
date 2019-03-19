const bodyParser = require('body-parser');
const app = require('express')();
const port = 3000;
const userRouter = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/ping', (req, res) => {

    res.json({
        'msg':"pong"
    })
})

app.use('/user', userRouter);


app.listen(port, ()=> {
    console.log(`listening to port ${port}`)
})