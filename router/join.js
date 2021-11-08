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
var User = mongoose.model('user', user);

const express = require('express')
const router = express.Router()
router.post('/join', (request, response) => {
    if (request.body.join_password != request.body.join_passwordcheck) {
        console.log("PASSWORD DIFFEREND")
    }
    const newUser = new User({
        username: request.body.join_name,
        birthday: request.body.join_birthday,
        email: request.body.join_email,
        phonenumber: request.body.join_phonenumber,
        password: request.body.join_password
    })
    newUser.save(function (err, data) {
        if (err) { console.log(err) }
        else { console.log("Saved") }
    })
    require('./utility').redirect(response, "http://localhost:3000/")
})

module.exports = router;