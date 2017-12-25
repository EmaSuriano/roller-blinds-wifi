import http from 'http';
import initSocket from './socket';
import { SERVER_PORT } from './constants';
import express from 'express';
import controller from './controller';

const app = express().use(controller);
const server = http.createServer(app);

let currentApp = app;
let currentAppSocket = initSocket(server);

server.listen(SERVER_PORT, () => {
  console.log(
    'Listening on port ' + SERVER_PORT + '... http://localhost:' + SERVER_PORT,
  );
});

if (module.hot) {
  module.hot.accept('./app', () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
