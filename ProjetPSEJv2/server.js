const express= require('express');
const datalayer = require('./datalayer/datalayer');
const routeForm = require('./router/route.form')


const host = "localhost";
const port = 9990;

//express begin:
const app = express();

app.use('/', routeForm);


app.use(express.static('./public'));
app.set('views', './views');
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
   
    res.render('index');
});

app.get("/login", (req, res) => {
    res.render('login');
}); 



datalayer.connectionDB();



app.listen(port, host, () => {
    try {
        console.log(`server running on ${host}:${port}`);
    } catch (error) {
        console.error(error);
    }
});