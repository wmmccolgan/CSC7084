//import dotenv module and declare path to config
const dotenv = require('dotenv').config({ path: './config.env' });

//import app module
const app = require('./app');

//implement listen action for app port
app.listen(process.env.PORT, (err) => {
    if (err) return console.log(err);

    console.log(`AllFeelzAPI API listening on port ${process.env.PORT}`);
});