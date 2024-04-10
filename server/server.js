
//load env variables
if(process.env.NODE_ENV !="production"){
    require('dotenv').config()

}

// import dependencies
const express = require('express')
const cors = require('cors');
const connectToDB = require('./config/connectToDB');
const ruchersController= require('./controllers/ruchersController');


//create an express app
const app = express()

//confifure express app
app.use(express.json());
app.use(cors());

//connect to database
connectToDB();
//routing

// Route to get all ruchers
app.get('/ruchers',ruchersController.fetchRuchers);

// Route to add a new rucher
app.post('/ruchers', ruchersController.createRucher);

//start our server
app.listen(process.env.PORT);