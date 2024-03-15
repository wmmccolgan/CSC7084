//require express module
const express = require('express');

//require user controller
const controller = require('../controllers/reading');

//create router object
const router = express.Router();

//GET /gettriggers
router.get('/gettriggers', controller.getTriggerList)

//GET /get individual reading
router.get('/getreading/:id', controller.getreading)

//GET /get TOP 5 reading for dashboard
router.get('/getdashboard/:id', controller.getDashboard)

//POST / - Create new reading
router.post('/', controller.insertreading);

//POST update individual reading - contextual trigger and diary entry
router.patch('/editreading/:id', controller.updatereading)

//POST delete individual reading - contextual trigger and diary entry
router.delete('/deletereading/:id', controller.deletereading)


module.exports = router;