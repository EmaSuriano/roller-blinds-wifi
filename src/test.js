const five = require('johnny-five');
const EtherPort = require('etherport');
// const EtherPortClient = require('etherport-client').EtherPortClient;

// const board = new five.Board({
//   port: new EtherPortClient({
//     host: '172.16.1.40',
//     port: 3030
//   }),
//  timeout: 1e5,
// });

const board = new five.Board({
  port: new EtherPort(3030),
  timeout: 1e5,
});

board.on('ready', function() {
  console.log('CONNECTION HAS BEEN SUCCESSFULLY ESTABLISHED');
});
