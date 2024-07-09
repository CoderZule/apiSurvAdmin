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
const inspectionsController = require('./controllers/inspectionsController');
const tasksController = require('./controllers/tasksController');
const harvestsController = require('./controllers/harvestsController');

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



// Add admin if not exists
usersController.AdminUser();

// Route to login
app.post('/api/user/login', usersController.loginUser);


// ---------- Admin routes ---------- 

//********** User routing **********

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

  // Route to change password on first login
   app.post('/api/user/changePasswordFirstLogin', usersController.changePasswordFirstLogin);

  // Route to change profil password
   app.post('/api/user/changeProfilPassword', usersController.changeProfilPassword);


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

// ---------- Client routes ---------- 

//********** Inspection routing **********

  // Route to get all inspections
     app.get('/api/inspection/getAllInspections', inspectionsController.fetchInspections);

  // Route to add a new inspection
    app.post('/api/inspection/create', inspectionsController.createInspection);

  // Route to get inspection by Hive ID
    app.get('/api/inspection/getInspectionByHiveId/:id', inspectionsController.getInspectionByHiveId);

  // Route to edit inspection
    app.post('/api/inspection/editInspection', inspectionsController.editInspection);
    
  // Route to delete inspection
    app.post('/api/inspection/deleteInspection', inspectionsController.deleteInspection);

//********** Task routing **********

 // Route to get all tasks
 app.get('/api/task/getAllTasks', tasksController.fetchTasks);

 // Route to add a new task
   app.post('/api/task/create', tasksController.createTask);

 // Route to get task by ID
   app.get('/api/task/getTaskById/:id', tasksController.getTaskById);

 // Route to edit task
   app.post('/api/task/editTask', tasksController.editTask);
   
 // Route to delete task
   app.post('/api/task/deleteTask', tasksController.deleteTask);

   
   
//********** Harvest routing **********

 // Route to get all harvests
 app.get('/api/harvest/getAllHarvests', harvestsController.fetchHarvests);

 // Route to add a new harvest
   app.post('/api/harvest/create', harvestsController.createHarvest);

 // Route to get harvest by ID
   app.get('/api/harvest/getHarvestById/:id', harvestsController.getHarvestById);

 // Route to edit harvest
   app.post('/api/harvest/editHarvest', harvestsController.editHarvest);
   
 // Route to delete harvest
 app.delete('/api/harvest/deleteHarvest/:harvestId', harvestsController.deleteHarvest);

// Get total quantity of product by unit
 app.get('/api/harvest/getTotals', harvestsController.getTotals);

 // reduce product quantity
 app.post('/api/harvest/updateQuantity', harvestsController.updateQuantity);




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