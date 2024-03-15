//import database connection object
const dbconn = require('../utils/dbconn');

//GET /gettriggers - select all contextual triggers from the database
exports.getTriggerList = (req, res) => {
    //declare SQL select query
    const selectSQL = "Select * from Context order by contextlabel asc";

    dbconn.query(selectSQL, (err, rows) => {   
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
                message: `${rows.length} records retrieved`,
                result: rows
            });
        }
    });


}

//GET individual reading
exports.getreading = (req, res) => {

    //declare SQL select query
    const selectSQL = "Select * from reading Where ReadingId = ?";
    
    console.log(req.params);
    console.log(req.body);

    const { id } = req.params;

    console.log(id);
        
    dbconn.query(selectSQL, id, (err, rows) => {   
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            if (rows.length > 0) {
                res.status(200);
                res.json({
                    status: 'success',
                    message: `Record ID ${id} retrieved`,
                    result: rows
                });
            } else {
                res.status(404);
                res.json({ 
                    status: 'failure',
                    message: `Invalid ID ${id}`
                });
            }
        }
    });
};


//GET individual reading
exports.getDashboard = (req, res) => {

    //declare SQL select query
    const selectSQL = "Select ReadingID, enjoyment, sadness, anger, contempt, disgust, fear, surprise, reading.Context, timestamp, UserComment, user_id, contextlabel from reading INNER JOIN Context ON reading.Context = Context.contextID Where user_id = ? order by ReadingId desc";
    
    console.log(req.params);
    console.log(req.body);

    const { id } = req.params;

    console.log(id);
        
    dbconn.query(selectSQL, id, (err, rows) => {   
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            if (rows.length > 0) {
                res.status(200);
                res.json({
                    status: 'success',
                    message: `Record retrieved`,
                    result: rows
                });
            } else {
                res.status(401);
                res.json({ 
                    status: 'success',
                    message: `No values found`
                });
            }
        }
    });
};

//POST /reading - Create new reading logic
exports.insertreading = (req, res) => {

    console.log(req.body);

    //declare variables and populate from request body
    const{formData: {enjoyment, sadness, anger, contempt, disgust, fear, surprise, contextID, UserComment}, user_id} = req.body;
    
    //add variables to array
    const queryVals = [enjoyment, sadness, anger, contempt, disgust, fear, surprise, contextID, UserComment,user_id];

    //declare insert SQL statement
    const insertSQL = 'INSERT INTO reading (enjoyment, sadness, anger, contempt, disgust, fear, surprise, Context, timestamp, UserComment, user_id) VALUES (?,?,?,?,?,?,?,?,CURDATE(),?,?)';

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
                message: `Record ID ${rows.insertId} added`,
                reading_id: rows.insertId

            });
        }

    });
};

//POST /reading - Create new reading logic
exports.updatereading = (req, res) => {

    console.log(req.body);
   
    //get reading id from request parameter 
     const { id } = req.params;

    //declare variables and populate from request body
    const{formData: {contextId, UserComment}, user_id} = req.body;
    
    //add variables to array
    const queryVals = [contextId, UserComment, id, user_id];

    //declare insert SQL statement
    const updateSQL = 'UPDATE reading SET Context = ?, UserComment =? WHERE ReadingId = ? AND user_id = ?';

    dbconn.query(updateSQL, queryVals, (err, rows) => {

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
                message: `Record ID ${id} added`,
                reading_id: id

            });
        }

    });
};


//POST /reading - Create new reading logic
exports.deletereading = (req, res) => {

    console.log(req.body);
   
    //get reading id from request parameter 
     const { id } = req.params;

    //declare insert SQL statement
    const deleteSQL = 'DELETE FROM reading WHERE ReadingId = ?';

    dbconn.query(deleteSQL, id, (err, rows) => {

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
                message: `Record ID ${id} removed`,
                reading_id: id

            });
        }

    });
};