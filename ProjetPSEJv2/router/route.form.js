const express = require('express');
const formController = require('../controllers/controller.form')
const router = express.Router();


router.post('/formSignin', formController.signIn);


router.post('/login_form', formController.logIn);


module.exports = router;


