// // const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

// app.use(require('./controller'));
// require('./socket.js')(io);

import express from 'express';
import controller from './controller';
// import socketIo from 'socket.io';
// import initSocket from './socket';

const app = express();

app.use(controller);
// const io = socketIo(app, {
//   serveClient: false,
//   wsEngine: 'ws', // uws is not supported since it is a native module
// });

// initSocket(io);

// let connectedSockets = [];

// const socketConnection = socket => {
//   connectedSockets.push(socket.id);
//   console.log('new socket connection', connectedSockets);

//   socket.on('disconnect', () => {
//     connectedSockets = connectedSockets.filter(x => x !== socket.id);
//     console.log('disconnected socket', connectedSockets);
//   });
// };

// io.on('connection', socketConnection);

export default app;
