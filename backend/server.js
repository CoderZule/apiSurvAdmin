// Load environment variables
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// Import dependencies
const express = require('express');
const cors = require('cors');
const http = require('http'); // Require http module for socket.io
const { connectToDB, getIO } = require('./config/connectToDB');
const usersController = require('./controllers/usersController');
const apiariesController = require('./controllers/apiariesController');
const hivesController = require('./controllers/hivesController');

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Create HTTP server
const server = http.createServer(app);


const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3001',
      methods: ['GET', 'POST'],
      credentials: true  // If you need to pass cookies or headers
    }
});
// Connect to database and set up change streams with socket.io
connectToDB(server); // Pass the server instance to connectToDB

//********** User routing **********

// Add admin if not exists
usersController.AdminUser();

// Route to login
app.post('/api/user/login', usersController.loginUser);

// Route to get all users
app.get('/api/user/getAllUsers', usersController.fetchUsers);

// Route to create a user
app.post('/api/user/create', usersController.createUser);

// Route to get user by ID
app.get('/api/user/getUserById/:id', usersController.getUserById);

// Route to edit user
app.post('/api/user/editUser', usersController.editUser);

// Route to delete user
app.post('/api/user/deleteUser', usersController.deleteUser);

//********** Apiary routing **********

// Route to get all apiaries
app.get('/api/apiary/getAllApiaries', apiariesController.fetchApiaries);

// Route to add a new apiary
app.post('/api/apiary/create', apiariesController.createApiary);

// Route to get apiary by ID
app.get('/api/apiary/getApiaryById/:id', apiariesController.getApiaryById);

// Route to edit apiary
app.post('/api/apiary/editApiary', apiariesController.editApiary);

// Route to delete apiary
app.post('/api/apiary/deleteApiary', apiariesController.deleteApiary);

//********** Hive routing **********

// Route to get all hives
app.get('/api/hive/getAllHives', hivesController.fetchHives);

// Route to add a new hive
app.post('/api/hive/create', hivesController.createHive);

// Route to get hive by ID
app.get('/api/hive/getHiveById/:id', hivesController.getHiveById);

// Route to edit hive
app.post('/api/hive/editHive', hivesController.editHive);

// Route to delete hive
app.post('/api/hive/deleteHive', hivesController.deleteHive);

io.on('connection', (socket) => {
    console.log('Client connected');

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server listening on the specified port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});