
//load env variables
if(process.env.NODE_ENV !="production"){
    require('dotenv').config()

}

// import dependencies
const express = require('express')
const cors = require('cors');
const connectToDB = require('./config/connectToDB');
const apiariesController= require('./controllers/apiariesController');
const usersController= require('./controllers/usersController');

//create an express app
const app = express()

//confifure express app
app.use(express.json());
app.use(cors());

//connect to database
connectToDB();



//********** Apiary routing **********

// Route to get all apiaries
app.get('/api/apiary/getAllApiaries',apiariesController.fetchApiaries);
// Route to add a new apiary
app.post('/api/apiary/createApiary', apiariesController.createApiary);



//********** User routing **********

//  add admin if not exists
usersController.AdminUser();
// Route to login 
app.post('/api/user/login', usersController.loginUser);













//start our server
app.listen(process.env.PORT, () => 'Server running');