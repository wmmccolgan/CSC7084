//require modules
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv').config({ path: './config.env'});
const session = require('express-session');

//create user and reading Router objects
const userRouter = require('./routes/user');
const readingRouter = require('./routes/reading');


//create application object
var app = express();

//define application view engine
app.set('view engine', 'ejs');


/*
	MIDDLEWARE STACK
*/

//express static middleware - path to public files (css, img etc)
app.use(express.static(path.join(__dirname, ('/public'))));
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
	secret: 'AllTheFeelzSessionSecret',
	resave: false,
	saveUninitiated: false
}));

//mount user and reading router middleware
app.use('/', userRouter);
app.use('/', readingRouter);


//define application port
app.listen(process.env.PORT, (err) => {
	if (err) return console.log(err);

	console.log(`Express web server listening on port ${process.env.PORT}`);

});