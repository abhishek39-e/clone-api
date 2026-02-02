const mongoose = require('mongoose');

const loginInfo = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    dob: Number,
    username: String
})
module.exports = mongoose.model('LoginInfo', loginInfo)