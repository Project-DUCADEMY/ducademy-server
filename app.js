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
    redirect(response, 'http://localhost:3000/mainpage')
})
pageRender('mainpage', 'ducami-main.html')
pageRender('loginpage', 'ducami-login.html')
app.use(bodyParser.urlencoded({ extended: false }))
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

function autoRoute(filename) {
    return path.join(route, filename)
}
function redirect(res, link) {
    res.statusCode = 302;
    res.setHeader('Location', link);
    res.end();
}
function pageRender(url, mainHtml) {
    app.use(`/${url}`, express.static(path.join(process.cwd(), '..', 'ducademy-front', url)))
    app.get(`/${url}`, function (request, response) {
        response.render(`${url}/${mainHtml}`)
    })
}