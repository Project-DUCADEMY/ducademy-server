const mongoose = require('mongoose');
const user = mongoose.Schema({
    username: String,
    birthday: String,
    email: { type: String, unique: true },
    phonenumber: { type: String, unique: true },
    password: String,
    role: String,
    grade: String
})
export var User = mongoose.model('users', user);