const port = 3000;
const {app} = require('./app');

app.listen(process.env.PORT || port, ()=> {
    console.log(`listening to port ${process.env.PORT} || ${port}`)
})
