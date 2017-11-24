const five = require('johnny-five');
const EtherPort = require('etherport');
// const EtherPortClient = require('etherport-client').EtherPortClient;

const board = new five.Board({
  port: new EtherPort(3030),
  // port: new EtherPortClient({
  //   host: '192.168.1.113', // IP ESP8266
  //   port: 3030,
  // }),
  timeout: 10000,
  repl: false,
});

board.on('ready', function() {
  console.log('READY!');
});
