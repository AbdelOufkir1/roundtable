const port = 3000;
const {app} = require('./app');

app.listen(port, ()=> {
    console.log(`listening to port ${port}`)
})
