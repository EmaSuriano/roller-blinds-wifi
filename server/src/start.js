const j5 = require('johnny-five');
const EtherPort = require('etherport');

const board = new j5.Board({
  port: new EtherPort(3030),
  timeout: 1e5
});

// to perfom one round, we have to use 2048
board.on('ready', function() {
  var stepper = new j5.Stepper({
    type: j5.Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 64,
    pins: [14, 12, 13, 15]
  });
  let totalSteps = 0;

  console.log('Stepper is correctly connected!');

  const onFinishStepperMovement = () => {
    totalSteps = totalSteps + steps;
    console.log('Motor has finished, current steps:' + totalSteps);
  };

  const moveMotor = (direction, steps = 0) =>
    stepper
      .rpm(60)
      .direction(direction)
      .step(steps, onFinishStepperMovement);

  this.repl.inject({
    goUp: steps => moveMotor(js.Stepper.DIRECTION.CW, steps),
    goDown: steps => moveMotor(js.Stepper.DIRECTION.CCW, steps),
    getStepperStatus: () => stepper.RUNSTATE,
    stepper,
    totalSteps
  });
});
