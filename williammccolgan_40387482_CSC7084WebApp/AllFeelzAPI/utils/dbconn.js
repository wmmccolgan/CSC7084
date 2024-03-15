//require mysql2 for MySQL negotiation
const mysql = require('mysql2');


//declare mysql connection object. Configuration Variables extermalised in config.env

const dbconn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});


//connect to database
dbconn.connect( (err) => {
    if (err) throw err;

    console.log('Connection to AllTheFeelz db successful');

});


//export module
module.exports = dbconn;