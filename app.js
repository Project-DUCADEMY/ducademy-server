const express = require('express')
const path = require('path')
const file = require('fs')
const bodyParser = require('body-parser');
const { request } = require('http');

const app = express();
const port = 3000
const route = path.join(process.cwd(), '..', 'ducademy-front')
const server = app.listen(port, () => {
    console.log("Server start : localhost:" + port)
})

app.set('views', route)
app.set('static', route)
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);

//console.log(express.static(path.join(process.cwd(), '..', 'ducademy-front')))

// app.get('/', function (require, response) {
//     response.render('ducami-login.html')
//     console.log(require.url);
// })
app.use('/', express.static(path.join(process.cwd(), '..', 'ducademy-front')))
app.get('/', function (require, response) {
    response.render('ducami-login.html')
    //console.log(require.url);
})
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/', function (require, response) {
    const id = require.body.login_id
    const password = require.body.login_password
    console.log(id, password);
})
