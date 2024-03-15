//declare axios object
const axios = require('axios');

//renders application home page
exports.getIndex = (req, res) => {

    const { isloggedin, user_id, firstname } = req.session;
    console.log(`User logged in: ${isloggedin}`);
    console.log(`User role: ${user_id}`);
 
    //render index view
    res.render('pages/index', {
         
        loggedin: isloggedin, 
        user_id: user_id,
        firstname: firstname,
        title: "All The Feelz Emotion Tracker"
    });

};


// renders user login form
exports.getUserLogin = (req, res) => {

   

    const logindata = { status: null };
    res.render('pages/login', { 
        loginsuccess: logindata,
        title: "User Login" 
    
    });
};


// renders user registration form
exports.getUserRegistration = (req, res) => {
 
    //render index view
    res.render('pages/userregistration', {
        title: "User Registration"
    });

};

//log out function
exports.getLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};


exports.postUserLogin = async (req, res) => {

    const vals = { username, password } = req.body;
    console.log(vals);

    const endpoint = `http://localhost:3007/user/login`;

    await axios
        .post(endpoint, vals, { validateStatus: (status) => { return status < 500} })
        .then((response) => {
            const status = response.status; 
            if (status === 200) {
                const data = response.data.result;
                console.log(data);

                //create session with user info
                const session = req.session;
                session.isloggedin = true;
                session.user_id = data[0].user_id;
                session.firstname = data[0].firstname;
                console.log(session);

                //get original route stored in session from isAuth middleware
                const originalRoute = session.route; 
                console.log(`postLogin: originalRoute: ${originalRoute}`);

                //logic to determine if original route is empty 
                if (!originalRoute) {
                    //set to default route if originalRoute is undefined
                    //New users who have not been redirected to login page from page which requires login 
                    res.redirect ('/userdashboard');
                } else {
                    //return users to page they tried to access which requires login
                    res.redirect(`${originalRoute}`);
                
                }
                


            } else {
                const data = response.data;
                console.log(data);

                //res.redirect('/');
                res.render('pages/login', { 
                loginsuccess: data, 
                title: "User Login" 
                });
            }
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
        });
};


// create new user logic
exports.postUserRegistration = async(req, res) => {
    
    const insertData = {firstname, surname, username, email_address, password} = req.body;

    console.log(insertData);

    //declare API endpoint
    const apiEndpoint = `http://localhost:3007/user`;

    await axios
        .post(apiEndpoint, insertData)
        .then((response) => {
            const data = response.data;
            console.log(data);
            res.redirect('/userlogin');
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
        });

};