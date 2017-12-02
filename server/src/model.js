const j5 = require('johnny-five');
const EtherPort = require('etherport');
const { SERVER_STATUS } = require('./constants');
const { calculateSteps } = require('./utils');

let status = SERVER_STATUS.CONNECTING;
let moveMotor;

const board = new j5.Board({
  port: new EtherPort(3030),
  timeout: 1e5,
});

board.on('ready', function() {
  status = SERVER_STATUS.SUCCESFULL;
  const stepper = new j5.Stepper({
    type: j5.Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 64,
    pins: [14, 12, 13, 15],
  });

  moveMotor = (steps, cb) => {
    const direction =
      steps > 0 ? js.Stepper.DIRECTION.CW : js.Stepper.DIRECTION.CCW;

    return stepper
      .rpm(60)
      .direction(direction)
      .step(steps, cb);
  };

  this.repl.inject({
    moveMotor,
    stepper,
  });
});

board.on('error', function(err) {
  status = SERVER_STATUS.ERROR;
  console.log('There was an error' + err);
});

exports.getPosition = function() {
  // TODO: GET POSITION FROM DATABASE/CLOUD
};

exports.setPosition = function(newPosition) {
  const steps = calculateSteps(newPosition, position);
  moveMotor(steps, () => {
    // TODO: SET POSITION IN DATABASE/CLOUD
    console.log('Do something here pls');
  });
};

exports.getStatus = function() {
  return status;
};
