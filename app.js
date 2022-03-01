import express from "express";
import path from 'path'
import http from 'http'
import https from 'https'
import { view_directory, user_directory } from './config/directory.js'
import bodyParser from 'body-parser';
import session from "express-session";
import MySQLStore from "express-mysql-session";
import config from './config/config.js'

const app = express()

http.createServer(app).listen(config.http_port,
    (result) => {
        console.log('Server Start port: ', config.http_port)
    })

try {
    https.createServer(
        {key: config.https.key, 
        cert: config.https.cert}, app)
    .listen(config.https_port, () => {
        console.log('HTTPS Server Start port: ', config.https_port)
    })
} catch (e) {
    console.error(e)
}


const sessionStore = new MySQLStore(config.database_connection)

app.use(session({
    secret: config.session.secret_key,
    resave: false,
    saveUninitialized: true,
    store: sessionStore  
}))

app.use(bodyParser.json());

app.use ( express.static( view_directory ))

app.get('/', (request, response) => {
    response.sendFile( path.join(view_directory, 'index.html') )
})


import sign from './router/sign.js'
app.use('/sign', sign)

import ssr from './router/ssr.js'
app.use('/ssr', ssr)

import user_directory_router from './router/user-directory.js'
app.use('/user-directory', user_directory_router)