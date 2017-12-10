const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(require('./controller'));
require('./socket.js')(io);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function() {
  console.log('Listening on port 3000...');
});
