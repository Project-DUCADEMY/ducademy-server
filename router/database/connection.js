const path = require('path');
const mysql = require('mysql2');
const dotenv = require("dotenv").config({
    path: path.resolve(
        path.join(process.cwd(), 'config'),
        process.env.NODE_ENV == "production" ? ".env" : ".env.dev"
    ),
});
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'ducademy'
})

connection.connect(err => {
    if (err) { throw (err) }
    else {
        console.log("database connected!")
    }
});
exports.connection = connection;