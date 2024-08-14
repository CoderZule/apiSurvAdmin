if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const mongoose = require("mongoose");
const socketIO = require('socket.io');

let io;

async function connectToDB(server) {
    try {
        await mongoose.connect(process.env.DB_URL, {
            serverSelectionTimeoutMS: 5000, // Set timeout for server selection
             
        });
        console.log("Connected to DB");

        const db = mongoose.connection;

        // Initialize socket.io
        io = socketIO(server);

        // Set up change stream for 'users' collection
        const usersChangeStream = db.collection('users').watch();
        usersChangeStream.on('change', (change) => {
            console.log('User collection change:', change);
            io.emit('usersChange', change);
        });

        // Set up change stream for 'apiaries' collection
        const apiariesChangeStream = db.collection('apiaries').watch();
        apiariesChangeStream.on('change', (change) => {
            console.log('Apiaries collection change:', change);
            io.emit('apiariesChange', change);
        });

        // Set up change stream for 'hives' collection
        const hivesChangeStream = db.collection('hives').watch();
        hivesChangeStream.on('change', (change) => {
            console.log('Hives collection change:', change);
            io.emit('hivesChange', change);
        });

    } catch (err) {
        console.log(err);
    }
}


function getIO() {
    return io;
}

module.exports = {
    connectToDB,
    getIO
};
