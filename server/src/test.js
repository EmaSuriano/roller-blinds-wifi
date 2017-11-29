const j5 = require('johnny-five');
const EtherPort = require('etherport');

const board = new j5.Board({
  port: new EtherPort(3030),
  timeout: 1e5
});

board.on('ready', function() {
  console.log('CONNECTION HAS BEEN SUCCESSFULLY ESTABLISHED');
});
