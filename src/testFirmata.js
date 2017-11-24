var Firmata = require('firmata').Board;
var EtherPortClient = require('etherport-client').EtherPortClient;

var board = new Firmata(
  new EtherPortClient({
    host: '172.16.1.40',
    port: 3030
  })
);

board.on('ready', function() {
  console.log('READY!');
});
