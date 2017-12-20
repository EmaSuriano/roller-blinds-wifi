const j5 = require('johnny-five');
const EtherPort = require('etherport');

const board = new j5.Board({
  port: new EtherPort(3030),
  timeout: 1e5,
  repl: false,
});

console.log('START LISTENING SERVER');

board.on('ready', () =>
  console.log('CONNECTION HAS BEEN SUCCESSFULLY ESTABLISHED'),
);

board.on('error', console.error);
