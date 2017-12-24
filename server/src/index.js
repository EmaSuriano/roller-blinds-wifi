import http from 'http';
import app from './app';
import { SERVER_PORT } from './constants';

const server = http.createServer(app);
let currentApp = app;

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
