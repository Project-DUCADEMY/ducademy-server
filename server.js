const file = require('fs');
const http = require('http');
const path = require('path');
const sql = require('mysql');

const port = 3000;
const front_path = path.join(process.cwd(), '..', 'ducademy-front');

const sqlconnection = sql.createConnection({
    host: "localhost",
    user: "geonho",
    password: "miner369"
});
sqlconnection.connect(function (error) {
    if (error) { throw error }
    else { console.log("Connected with sql") }

})

var server;
server = http.createServer(function (req, res) {
    if (req.url == '/') {
        req.url = 'ducami-login.html';
    }
    const { method, url } = req;
    console.log(url, method);
    var filename = path.join(front_path, url); //현재 폴더 위치 + 요청한 url
    //console.log(filename);

    if (method == 'GET') {
        file.exists(filename, function (exists) {
            if (exists) {
                file.readFile(filename
                    , encoding = 'utf-8'
                    , function (err, data) {
                        if (err) {
                            res.writeHead(500, { "Content-Type": "text/plain" });
                            res.write(err + "\n");
                            res.end();
                        }
                        else {
                            res.writeHead(200);
                            res.write(data);
                            res.end();
                        }
                    });
            }
            else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write("404 Not Found\n");
                res.end();
            }
        });
    }
    else if (method == 'POST') {
        console.log(req)
    }
});

server.listen(port, function () {
    console.log("server started:", port);
});


// const express = require('express')
// const index = require('./router/index');

// const app = express()
// const port = 3000

// app.use('/', index);

// // app.get('/', (req, res) => {
// //     const { method, url } = req;
// //     console.log(url, method);
// //     res.sendFile(front_folder + '/ducami-login.html')
// // })

// // app.get((req, res) => {
// //     const { method, url } = req;
// //     console.log(url, method);
// // })

// app.listen(port, () => {
//     console.log(`Server start at http://localhost:${port}`)
// })