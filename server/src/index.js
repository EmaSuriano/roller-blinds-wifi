/*


import http from 'http';
import socketIo from 'socket.io';
import onSocket from './hotReloadSocket';
// import express from 'express';
import expressApp from './controller';
// import controller from './controller';
import { SERVER_PORT } from './constants';

// let currentExpressApp = express().use(controller);
const server = http.createServer(expressApp);
let currentExpressApp = expressApp;

const io = socketIo(server, {
  serveClient: false,
  wsEngine: 'ws', // uws is not supported since it is a native module
});

let currentOnSocket = onSocket(io);
io.on('connection', currentOnSocket);

server.listen(SERVER_PORT, () => {
  console.log(
    'Listening on port ' + SERVER_PORT + '... http://localhost:' + SERVER_PORT,
  );
});

if (module.hot) {
  module.hot.accept('./controller', () => {
    server.removeListener('request', currentExpressApp);
    server.on('request', expressApp);
    currentExpressApp = expressApp;
  });

  module.hot.accept('./hotReloadSocket', () => {
    io.removeListener('connection', currentOnSocket);
    currentOnSocket = onSocket(io);
    io.on('connection', currentOnSocket);
  });
}


*/

import http from 'http';
import socketIo from 'socket.io';
import onSocket from './hotReloadSocket';
import app from './server';

const server = http.createServer(app);
let currentApp = app;
server.listen(8001);

const io = socketIo(8000, {
  serveClient: false,
  wsEngine: 'ws', // uws is not supported since it is a native module
});

// const io = socketIo.listen(server);

let currentOnSocket = onSocket(io);
io.on('connection', currentOnSocket);

if (module.hot) {
  module.hot.accept('./server', () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });

  module.hot.accept('./hotReloadSocket', () => {
    io.removeListener('connection', currentOnSocket);
    currentOnSocket = onSocket(io);
    io.on('connection', currentOnSocket);
  });
}
