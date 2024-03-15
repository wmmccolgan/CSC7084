//import express module
const express = require('express');

//import user controller
const controller = require('./../controllers/user');

//create router object
const router = express.Router();

//GET / - Select User from Database
router.get('/', controller.getUser);

//POST / - Create new user
router.post('/login', controller.postUserLogin);

//POST / - Create new user
router.post('/', controller.postUserRegistration);


module.exports = router;

