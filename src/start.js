const five = require('johnny-five');
const EtherPort = require('etherport');

const board = new five.Board({
  port: new EtherPort(3030),
  timeout: 1e5,
});
 
// to perfom one round, we have to use 2048
board.on('ready', function() {
  var stepper = new five.Stepper({
    type: five.Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 64,
    pins: [14, 12, 13, 15],
  });

  console.log('Stepper is correctly connected!');

  const moveMotor = direction => (steps = 0) => (
    stepper.rpm(60).direction(direction).step(steps, () => console.log("Motor has stopped")));

  this.repl.inject({
    goUp: moveMotor(five.Stepper.DIRECTION.CW),
    goDown: moveMotor(five.Stepper.DIRECTION.CCW),
    stepper,
  });
});

board.on('error', function(error) {
  console.log(console.log(error, error.stack.split('\n')));
});
