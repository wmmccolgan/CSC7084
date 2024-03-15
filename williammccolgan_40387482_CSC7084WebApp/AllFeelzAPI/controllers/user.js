//import database connection object
const dbconn = require('./../utils/dbconn');

// GET /user
exports.getUser = (req, res) => {

    //Declare SQL Statement
    const selectUser = 'SELECT * FROM user';

    dbconn.query(selectUser, (err, rows) => {

        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            res.status(200);
            res.json({
                status: 'success',
                message: `${rows.length} user records returned`,
                result: rows
            });
        }

    });
}

//POST /user/login - Login user
exports.postUserLogin = (req, res) =>{

    const { username, password } = req.body;
    const vals = [ username, password ];

    const checkuserSQL = `SELECT user_id, UserFirst FROM users WHERE users.username = '${ username }' 
                            AND users.password = '${ password }'`;

    dbconn.query( checkuserSQL, vals, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {

            console.log(`Length = ${rows.length}`);
            if (rows.length > 0) {
                res.status(200);
                
                res.json({
                    status: 'success',
                    message: `${rows.length} records retrieved`,
                    result: rows
                });
            } else {
                res.status(401);
                res.json({ 
                    status: 'failure',
                    message: `Invalid user credentials`
                });
            }
        }
    });
};

//POST /user - Create new user logic
exports.postUserRegistration = (req, res) => {

    //declare variables and populate from request body
    const{UserFirst, UserLast, username, UserEmail, password} = req.body;
    
    //add variables to array
    const queryVals = [UserFirst, UserLast, username, UserEmail, password];

    //declare insert SQL statement
    const insertSQL = 'INSERT INTO users (UserFirst, UserLast, username, UserEmail, password) VALUES (?,?,?,?,?)';

    dbconn.query(insertSQL, queryVals, (err, rows) => {

        if (err) {
            res.status(500);
            res.json({
                status: 'failure', 
                message: err
            });
        } else {
            res.status(201);
            res.json({
                status: 'success', 
                message: `Record ID ${rows.insertId} added`

            });
        }

    });
};