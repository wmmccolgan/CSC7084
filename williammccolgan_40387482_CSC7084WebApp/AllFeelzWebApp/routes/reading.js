//require express module
const express = require('express');

//require emotion controller
const readingcontroller = require('../controllers/reading')

//require isAuth middleware
const { isAuth } = require('../middleware/auth');


//declare router object
const router = express.Router();



// ---- GET ROUTES -----

// GET - Add reading
router.get('/addreading', isAuth, readingcontroller.getInsertreading);

// GET - Edit individual reading

router.get('/editreading/:id', isAuth, readingcontroller.getEditreading);

// GET - Edit individual reading

router.get('/viewreading/:id', isAuth, readingcontroller.getViewreading);

// GET - User Dashboard

router.get ('/userdashboard', isAuth, readingcontroller.getDashboard);


// GET - User Dashboard

router.get ('/userjournal', isAuth, readingcontroller.getJournal);

// GET - User Dashboard

router.get ('/userreport', isAuth, readingcontroller.getReport);


//     POST ROUTES

// POST - Add reading
router.post('/addreading', readingcontroller.postInsertreading);

// POST - Update individual reading

router.post('/editreading/:id', isAuth, readingcontroller.postUpdatereading);

// POST - Deleted individual reading

router.post('/deletereading/:id', isAuth, readingcontroller.postDeletereading);


//export reading router module

module.exports = router;