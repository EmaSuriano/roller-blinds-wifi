const { SERVER_PORT } = require('./constants');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(require('./controller'));
require('./socket.js')(io);

http.listen(SERVER_PORT, () => {
  console.log(
    'Listening on port ' + SERVER_PORT + '... http://localhost:' + SERVER_PORT,
  );
});
