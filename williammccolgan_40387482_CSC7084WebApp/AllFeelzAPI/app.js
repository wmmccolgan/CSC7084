//require express module
const express = require('express');

//require morgan module
const morgan = require('morgan');

//create reading router object
const readingRouter = require('./routes/reading');
//create user router object
const userRouter = require('./routes/user');

//declare application object
const app = express();

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//declare base for router URIs
app.use('/reading', readingRouter);
app.use('/user', userRouter);

//export app module
module.exports = app;