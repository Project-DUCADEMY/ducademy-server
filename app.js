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

var datebase = mongoose.connect('mongodb://localhost:27017/ducademy', (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Succesfully Connected!');
    }
});

app.use('/', express.static(route))
app.get('/', function (request, response) { redirect(response, 'http://localhost:3000/mainpage') })
pageRender('mainpage', 'ducami-main.html')
pageRender('loginpage', 'ducami-login.html')

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/login', require('./router/login.js'));
app.use('/join', require('./router/join.js'));
function autoRoute(filename) {
    return path.join(route, filename)
}
function redirect(res, link) {
    res.statusCode = 302;
    res.setHeader('Location', link);
    res.end();
}
function pageRender(url, mainHtml) {
    app.use(`/${url}`, express.static(route))
    app.get(`/${url}`, function (request, response) {
        response.render(`${url}/${mainHtml}`)
    })
}