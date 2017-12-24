// // const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

// app.use(require('./controller'));
// require('./socket.js')(io);

import express from 'express';
import controller from './controller';

const app = express();

app.use(controller);

export default app;
