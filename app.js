const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const http_port = process.env.HTTP_PORT;
const dotenv = require("dotenv").config({
    path: path.resolve(
        path.join(process.cwd(), 'config'),
        process.env.NODE_ENV == "production" ? ".env" : ".env.dev"
    ),
});

const app = express();
const route = path.join(process.cwd(), '..', 'ducademy-front')

app.set('views', route)
app.set('static', route)
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);

app.use('/', express.static(route))
app.get('/', function (request, response) { require('./helpers').redirect(response, 'http://localhost:3000/loginpage') })
pageRender('mainpage', 'ducami-main.html')
pageRender('loginpage', 'ducami-login.html')

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/login', require('./router/login.js'));
app.use('/join', require('./router/join.js'));

const server = app.listen(http_port, () => {
    console.log("Server start : localhost:" + http_port)
})
function pageRender(url, mainHtml) {
    app.use(`/${url}`, express.static(route))
    app.get(`/${url}`, function (request, response) {
        response.render(`${url}/${mainHtml}`)
    })
}