//require express module
const express = require('express');

//require emotion controller
const usercontroller = require('../controllers/user')

//declare router object
const router = express.Router();


// ---- GET ROUTES -----

// GET - Index Route - Render Homepage
router.get('/', usercontroller.getIndex);

// GET - User Registration - Render Registration Page
router.get('/userregistration', usercontroller.getUserRegistration);

//GET - User Login - Render Login Page
router.get('/userlogin', usercontroller.getUserLogin);
//GET - User Logout 
router.get('/logout', usercontroller.getLogout);


// ---- POST ROUTES -----

//POST - User Login
router.post('/userlogin', usercontroller.postUserLogin);

//POST - Create New User
router.post('/userregistration', usercontroller.postUserRegistration);




//export user router module

module.exports = router;