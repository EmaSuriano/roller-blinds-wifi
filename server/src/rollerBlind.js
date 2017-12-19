const { Board, Stepper } = require('johnny-five');
const EtherPort = require('etherport');
const { getPositionFromDB, setPositionToDB } = require('./service');
const {
  SERVER_STATUS,
  ERROR_MESSAGE,
  ETHERPORT_PORT,
  MOTOR_PINS,
  EXCEPTIONS,
} = require('./constants');
const { calculateSteps, noop } = require('./utils');

let status = SERVER_STATUS.CONNECTING;
let position = -1;
let moveMotor = async () => {
  throw new Error(ERROR_MESSAGE.NOT_CONNECTED);
};

const board = new Board({
  port: new EtherPort(ETHERPORT_PORT),
  timeout: 1e5,
});

board.on('ready', () => {
  status = SERVER_STATUS.SUCCESSFUL;

  const stepper = new Stepper({
    type: Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 96,
    pins: MOTOR_PINS,
  });

  moveMotor = steps =>
    new Promise(resolve =>
      stepper
        .rpm(300)
        .direction(steps > 0 ? Stepper.DIRECTION.CCW : Stepper.DIRECTION.CW)
        .step(Math.abs(steps), resolve),
    );

  this.repl.inject({
    moveMotor,
    stepper,
  });
});

board.on('error', error => {
  status = SERVER_STATUS.ERROR;
  console.error(ERROR_MESSAGE.CONNECTING_BOARD_ERROR);
});

const getPosition = async () => {
  const savedPosition = await getPositionFromDB();
  position = savedPosition;
  return position;
};

const setPosition = async (newPosition = position) => {
  const steps = calculateSteps(newPosition, position);
  await moveMotor(steps);
  await setPositionToDB(newPosition);
  position = newPosition;
  return position;
};

const getStatus = () => status;

module.exports = {
  getPosition,
  setPosition,
  getStatus,
};
