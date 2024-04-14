
//load env variables
if(process.env.NODE_ENV !="production"){
    require('dotenv').config()

}

// import dependencies
const express = require('express')
const cors = require('cors');
const connectToDB = require('./config/connectToDB');
const ruchersController= require('./controllers/ruchersController');
const usersController= require('./controllers/usersController');

//create an express app
const app = express()

//confifure express app
app.use(express.json());
app.use(cors());

//connect to database
connectToDB();



//********** Rucher routing **********

// Route to get all ruchers
app.get('api/getAllRuchers',ruchersController.fetchRuchers);
// Route to add a new rucher
app.post('api/createRucher', ruchersController.createRucher);



//********** User routing **********

//  add admin if not exists
usersController.AdminUser();
// Route to login user
app.post('/api/user/login', usersController.loginUser);













//start our server
app.listen(process.env.PORT, () => 'Server running');