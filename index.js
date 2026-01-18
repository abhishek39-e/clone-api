const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//hell
mongoose.connect(process.env.MONDB)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err);
    });
// app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/users', require('./routes/UsersRoutes'))
app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000/`);
});