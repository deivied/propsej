
const User = require('../model/users.model');
const bodyParser = require('body-parser');


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const signIn = (req, res, next) => {
    const user = new User({
        prenom: req.body.prenom,
        nom: req.body.nom,
        email: req.body.email,
        numero: req.body.tele,
        profil: req.body.profil,
        secret: req.body.pass
    });
    user.save().then(
        () => {
            res.status(201).json({
                message: 'user saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

const logIn = (req, res, next) => {
    let logInf = {
        login: req.body.login,
        secret: req.body.pass,
        profil: req.body.profil
    };
    User.findOne({
        email: logInf.login,
        secret: logInf.secret
    }).then(
        () => {
            res.status(201).json({
                message: 'user saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

module.exports = {
    signIn,
    logIn,

}