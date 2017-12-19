const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(require('./controller'));
require('./socket.js')(io);

http.listen(3000, () => {
  console.log('Listening on port 3000... http://localhost:3000');
});
