//declare axios object
const axios = require('axios');


//render add new reading page
exports.getInsertreading = async (req, res) => {


    const { isloggedin, user_id, firstname } = req.session;
    console.log(`User logged in: ${isloggedin}`);
    console.log(`User role: ${user_id}`);

    //request to populate contextual triggers dropdown
    const endpoint = `http://localhost:3007/reading/gettriggers`;

    await axios
        .get(endpoint)
        .then((response) => {
            const triggerList = response.data.result;
            console.log(triggerList);

            res.render('pages/addreading', {
                title: "Add New reading",
                triggerList: triggerList,
                loggedin: isloggedin,
                user_id: user_id,
                firstname: firstname
            });

        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
        });

};

//GET individual reading for update

exports.getEditreading = async (req, res) => {


    const { isloggedin, user_id, firstname } = req.session;
    console.log(`User logged in: ${isloggedin}`);
    console.log(`User role: ${user_id}`);

    //populate reading id from request parameters
    const { id } = req.params;
    console.log(id);

    //request to populate contextual triggers dropdown
    const endpoint = `http://localhost:3007/reading/getreading/${id}`;

    //request to populate contextual triggers dropdown
    const triggersendpoint = `http://localhost:3007/reading/gettriggers`;

    await axios
        .get(endpoint)
        .then((response) => {
            const readingData = response.data.result;
            console.log(readingData);


            axios.get(triggersendpoint)
                .then(response => {
                    const triggerList = response.data.result;
                    console.log(triggerList);



                    res.render('pages/editreading', {
                        title: "Update reading",
                        triggerList: triggerList,
                        readingData: readingData,
                        loggedin: isloggedin,
                        user_id: user_id,
                        firstname: firstname
                    });

                });

        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
        });

};


//GET individual reading for update

exports.getViewreading = async (req, res) => {


    const { isloggedin, user_id, firstname } = req.session;
    console.log(`User logged in: ${isloggedin}`);
    console.log(`User role: ${user_id}`);

    //populate reading id from request parameters
    const { id } = req.params;
    console.log(id);

    //request to populate contextual triggers dropdown
    const endpoint = `http://localhost:3007/reading/getreading/${id}`;

    //request to populate contextual triggers dropdown
    const triggersendpoint = `http://localhost:3007/reading/gettriggers`;

    await axios
        .get(endpoint)
        .then((response) => {
            const readingData = response.data.result;
            console.log(readingData);

            const { enjoyment } = readingData;
            console.log(enjoyment);

            axios.get(triggersendpoint)
                .then(response => {
                    const triggerList = response.data.result;
                    console.log(triggerList);


                    res.render('pages/viewreading', {
                        title: "View reading",
                        triggerList: triggerList,
                        readingData: readingData,
                        loggedin: isloggedin,
                        user_id: user_id,
                        firstname: firstname
                    });

                });

        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
        });

};


//GET top 5 records for dashboard

exports.getDashboard = async (req, res) => {


    const { isloggedin, user_id, firstname } = req.session;
    console.log(`User logged in: ${isloggedin}`);
    console.log(`User role: ${user_id}`);

    //populate reading id from request parameters
    const { id } = req.params;
    console.log(id);

    //request to populate contextual triggers dropdown
    const endpoint = `http://localhost:3007/reading/getdashboard/${user_id}`;


    await axios
        .get(endpoint)
        .then((response) => {
            const dashboardData = response.data.result;
            console.log(dashboardData);

            const status = response.status; 
            if (status === 200) {

            res.render('pages/userdashboard', {
                title: "Dashboard",
                dashboardData: dashboardData,
                loggedin: isloggedin,
                user_id: user_id,
                firstname: firstname
            });
            } else if (status === 401){
                res.render('pages/userdashboard', {
                    title: "Dashboard",
                    dashboardData: dashboardData,
                    loggedin: isloggedin,
                    user_id: user_id,
                    firstname: firstname
                });
            }

        })        
        .catch ((error) => {
        console.log(`Error making API request: ${error}`);
    });

};


//GET show jounal dashboard

exports.getJournal = async (req, res) => {


    const { isloggedin, user_id, firstname } = req.session;
    console.log(`User logged in: ${isloggedin}`);
    console.log(`User role: ${user_id}`);

    //populate reading id from request parameters
    const { id } = req.params;
    console.log(id);

    //request to populate contextual triggers dropdown
    const endpoint = `http://localhost:3007/reading/getdashboard/${user_id}`;


    await axios
        .get(endpoint)
        .then((response) => {
            const dashboardData = response.data.result;
            console.log(dashboardData);

            const status = response.status; 
            if (status === 200) {

            res.render('pages/userjournal', {
                title: "My Journal",
                dashboardData: dashboardData,
                loggedin: isloggedin,
                user_id: user_id,
                firstname: firstname, 
            });

            }else{
                res.render('pages/userjournal', {
                    title: "My Journal",
                    dashboardData: dashboardData,
                    loggedin: isloggedin,
                    user_id: user_id,
                    firstname: firstname
                });
            }
            


        })        
        .catch ((error) => {
        console.log(`Error making API request: ${error}`);
    });

};

//GET show report dashboard

exports.getReport = async (req, res) => {


    const { isloggedin, user_id, firstname } = req.session;
    console.log(`User logged in: ${isloggedin}`);
    console.log(`User role: ${user_id}`);

    //populate reading id from request parameters
    const { id } = req.params;
    console.log(id);

    //request to populate contextual triggers dropdown
    const endpoint = `http://localhost:3007/reading/getdashboard/${user_id}`;


    await axios
        .get(endpoint)
        .then((response) => {
            const dashboardData = response.data.result;
            console.log(dashboardData);

            const status = response.status; 
            if (status === 200) {

            //create arrays for report
            const dates = [];
            const enjoyment = [];
            const sadness = [];
            const anger = [];
            const contempt = [];
            const disgust = [];
            const fear = [];
            const surprise = [];

            dashboardData.forEach((row)=> {         
                dates.push(row.timestamp.substring(0,10));
                enjoyment.push(row.enjoyment);
                sadness.push(row.sadness);
                anger.push(row.anger);
                contempt.push(row.contempt);
                disgust.push(row.disgust);
                fear.push(row.fear);
                surprise.push(row.surprise);

            });

            console.log(dates);

            res.render('pages/report', {
                title: "Report",
                dashboardData: dashboardData,
                loggedin: isloggedin,
                user_id: user_id,
                firstname: firstname, 
                dates: dates,
                enjoyment: enjoyment,
                sadness: sadness,
                anger: anger,
                contempt: contempt,
                disgust: disgust,
                fear: fear,
                surprise: surprise        
            });

            }
            


        })        
        .catch ((error) => {
        console.log(`Error making API request: ${error}`);
    });

};


//Insert new reading

exports.postInsertreading = async (req, res) => {


    const formData = { enjoyment, sadness, anger, contempt, disgust, fear, surprise, contextID, UserComment } = req.body;

    const { user_id } = req.session;

    const insertData = { formData, user_id };


    console.log(insertData);

    //declare API endpoint
    const apiEndpoint = `http://localhost:3007/reading`;



    await axios
        .post(apiEndpoint, insertData, {
            user_id: user_id
        })
        .then((response) => {         
            
            console.log(response.data);
            const reading_ID = response.data.reading_id;


            res.redirect(`viewreading/${reading_ID}`);
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
        });
};


//Update reading

exports.postUpdatereading = async (req, res) => {

    //populate reading id from request parameters
    const { id } = req.params;
    console.log(id);


    const formData = { contextID, UserComment } = req.body;

    const { user_id } = req.session;

    const updateData = { formData, user_id };


    console.log(updateData);

    //declare API endpoint
    const apiEndpoint = `http://localhost:3007/reading/editreading/${id}`;

    console.log(apiEndpoint);



    await axios
        .patch(apiEndpoint, updateData, {
            user_id: user_id
        })
        .then((response) => {
            const data = response.data;
            console.log(data);
            res.redirect('/');
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
        });
};

//Update reading

exports.postDeletereading = async (req, res) => {

    //populate reading id from request parameters
    const { id } = req.params;
    console.log(id);

    //declare API endpoint
    const apiEndpoint = `http://localhost:3007/reading/deletereading/${id}`;

    console.log(apiEndpoint);



    await axios
        .delete(apiEndpoint)
        .then((response) => {
            const data = response.data;
            console.log(data);
            res.redirect('/userdashboard');
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
        });
};