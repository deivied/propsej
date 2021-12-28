const mongoose = require('mongoose');
const express = require('express');
const datalayer = require('./datalayer/datalayer');
const req = require('express/lib/request');
const res = require('express/lib/response');
const User = require('./model/users.model');
const bodyParser = require('body-parser');
const { redirect } = require('express/lib/response');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const host = "localhost";
const port = 9990;

//express begin:
const app = express();

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.static('./public'));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.set('views', './views');
app.set('view engine', 'ejs');

let session;

app.get("/", (req, res) => {
    session=req.session;
    if(session.userid){
        res.redirect('/userhome');
    }else
    res.render('index');
});

app.get("/login", (req, res) => {
    res.render('login');
});

app.post("/formSignin", async (req, res) => {
    let user = {
        prenom: req.body.prenom,
        nom: req.body.nom,
        email: req.body.email,
        numero: req.body.tele,
        profil: req.body.profil,
        secret: req.body.pass
    }
    const queryU = await User.create(user)
    console.log(queryU);
    res.render('index', queryU);
});



app.post("/login_form", async (req, res) => {
    let userPut = {
        login: req.body.login,
        secret: req.body.pass,
        profil: req.body.profil
    };
    let verif = await User.findOne({
        email: userPut.login,
        secret: userPut.secret
    });
    if (verif) {
        if (userPut.profil === "gestionnaire") {
            session = req.session;
            console.log(req.session)
            session.userid = req.body.prenom;
            res.redirect('/userhome')
        }
        if (userPut.profil === "client") {
            session = req.session;
            console.log(req.session)
            session.userid = req.body.prenom;
            res.redirect('/userhome')
        }
        if (userPut.profil === "prestataire") {
            session = req.session;
            console.log(req.session)
            req.session.userid = req.body.prenom;
            res.redirect('/userhome');
        }
        else {
            return;
        }
    }
});

app.get('/userhome', async (req, res) => {
    session = req.session
    let userinf = {
        prenom : req.session.userid
    }
    console.log(userinf);
    res.render('user-home', {userinf} )
});


datalayer.connectionDB();



app.listen(port, host, () => {
    try {
        console.log(`server running on ${host}:${port}`);
    } catch (error) {
        console.error(error);
    }
});