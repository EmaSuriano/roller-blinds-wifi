const five = require('johnny-five');
const EtherPort = require('etherport');

const board = new five.Board({
  port: new EtherPort(3030),
  timeout: 1e5,
});

board.on('ready', function() {
  var stepper = new five.Stepper({
    type: five.Stepper.TYPE.DRIVER,
    stepsPerRev: 4096, // steps per revolution for BYJ48
    pins: {
      step: 12,
      dir: 11,
    },
  });

  console.log('stepper is correctly connected!');

  this.repl.inject({
    goUp: () => 'Going up',
    goDown: () => 'Going down',
    stepper,
  });
});
