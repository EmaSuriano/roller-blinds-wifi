const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(require('./controller'));
require('./socket.js')(io);

http.listen(8000, function() {
  console.log('Listening on port 8000... http://localhost:8000');
});
