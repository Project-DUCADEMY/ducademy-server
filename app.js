const express = require('express');
const path = require('path');
const file = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var crypto = require('crypto');

const app = express();
const port = 3000
const route = path.join(process.cwd(), '..', 'ducademy-front')
const server = app.listen(port, () => {
    console.log("Server start : localhost:" + port)
})

const databaseName = 'ducademy'

app.set('views', route)
app.set('static', route)
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);

// const mongoClient = require('mongodb').MongoClient
// mongoose.connect('mongodb://localhost:27017/ducademy', {
//     useNewUrlParser: true, useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected!'))
//     .catch(error => console.log(error))
// const database = mongoose.connection
// var database;
// mongoose.connect(`mongodb://localhost:27017/${databaseName}`,
//     function (err, db) {
//         if (err) {
//             console.log('db connect error');
//             return;
//         }
//         console.log('db was connected : ' + databaseName);
//         database = db;
//     }
// );

var db = mongoose.connect('mongodb://localhost:27017/ducademy', (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Succesfully Connected!');
    }
});


var user = mongoose.Schema({
    username: 'string',
    birthday: 'number',
    email: 'string',
    phonenumber: 'number',
    password: 'string',
    role: 'string',
    grade: 'number'
})
var User = mongoose.model('users', user);

app.use('/', express.static(path.join(process.cwd(), '..', 'ducademy-front')))
app.get('/', function (request, response) {
    response.sendFile(autoRoute('ducami-login.html'))
})
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/', function (require, response) {
})

app.post('/login', function (request, response) {
    User.findOne({
        email: request.body.login_id,
        password: request.body.login_password
    }, (err, user) => {
        console.log(err, user)
    })

    response.statusCode = 302;
    response.setHeader('Location', 'http://localhost:3000/');
    response.end();
})
app.post('/join', function (request, response) {

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
    response.statusCode = 302;
    response.setHeader('Location', 'http://localhost:3000/');
    response.end();
})

user.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

function autoRoute(filename) {
    return path.join(route, filename)
}

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'geonho',
//     password: 'miner369',
// });

// connection.connect(function (error) {
//     if (error) throw error;
//     console.log('Connected')
// });