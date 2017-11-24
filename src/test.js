const five = require('johnny-five');
// const EtherPort = require('etherport');
const EtherPortClient = require('etherport-client').EtherPortClient;

const board = new five.Board({
  port: new EtherPortClient({
    host: '172.16.1.40',
    port: 3030
  })
});

board.on('ready', function() {
  console.log('READY!');
});
