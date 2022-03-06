import express from "express";
import fs from "fs";
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
        {key: fs.readFileSync(config.https.key), 
        cert: fs.readFileSync(config.https.cert)}, app)
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


// import { Server as socketio } from 'socket.io'
// console.log(socketio)
// let io = socketio.listen(server)

// let users = {};
// let socketToRoom = {};
// const maximum = 4;

// io.on('connection', socket => {
//     socket.on('join_room', data => {
//         if (users[data.room]) {
//             const length = users[data.room].length;
//             if (length === maximum) {
//                 socket.to(socket.id).emit('room_full');
//                 return;
//             }
//             users[data.room].push({id: socket.id, email: data.email});
//         } else {
//             users[data.room] = [{id: socket.id, email: data.email}];
//         }
//         socketToRoom[socket.id] = data.room;

//         socket.join(data.room);
//         console.log(`[${socketToRoom[socket.id]}]: ${socket.id} enter`);

//         const usersInThisRoom = users[data.room].filter(user => user.id !== socket.id);

//         console.log(usersInThisRoom);

//         io.sockets.to(socket.id).emit('all_users', usersInThisRoom);
//     });

//     socket.on('offer', data => {
//         socket.to(data.offerReceiveID).emit('getOffer', {sdp: data.sdp, offerSendID: data.offerSendID, offerSendEmail: data.offerSendEmail});
//     });

//     socket.on('answer', data => {
//         socket.to(data.answerReceiveID).emit('getAnswer', {sdp: data.sdp, answerSendID: data.answerSendID});
//     });

//     socket.on('candidate', data => {
//         socket.to(data.candidateReceiveID).emit('getCandidate', {candidate: data.candidate, candidateSendID: data.candidateSendID});
//     })

//     socket.on('disconnect', () => {
//         console.log(`[${socketToRoom[socket.id]}]: ${socket.id} exit`);
//         const roomID = socketToRoom[socket.id];
//         let room = users[roomID];
//         if (room) {
//             room = room.filter(user => user.id !== socket.id);
//             users[roomID] = room;
//             if (room.length === 0) {
//                 delete users[roomID];
//                 return;
//             }
//         }
//         socket.to(roomID).emit('user_exit', {id: socket.id});
//         console.log(users);
//     })
// });