const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//hell
let connectedMongo = false;
const db = async () => {
    if (connectedMongo) return;
    try {
        await mongoose.connect(process.env.MONDB)
        connectedMongo = true;
        console.log('MongoDB Connected');
    }
    catch (err) {
        console.error('MongoDB connection failed:', err);
        throw err;

    }
}

app.use(async (req, res, next) => {
    await db();
    next();
});
// app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/users', require('./routes/UsersRoutes'))
module.exports = app;