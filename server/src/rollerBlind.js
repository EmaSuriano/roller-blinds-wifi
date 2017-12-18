const j5 = require('johnny-five');
const EtherPort = require('etherport');
const {getPositionFromDB, setPositionToDB} = require('./service');
const {SERVER_STATUS, ERROR_MESSAGE} = require('./constants');
const {calculateSteps, noop} = require('./utils');

let status = SERVER_STATUS.CONNECTING;
let position = -1;
let moveMotor;

const board = new j5.Board({
  port: new EtherPort(3030),
  timeout: 1e5,
});

board.on('ready', function() {
  status = SERVER_STATUS.SUCCESSFUL;

  const stepper = new j5.Stepper({
    type: j5.Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 96,
    pins: [14, 12, 13, 15],
  });

  moveMotor = (steps, cb = noop) =>
    stepper
      .rpm(300)
      .direction(steps > 0 ? j5.Stepper.DIRECTION.CCW : j5.Stepper.DIRECTION.CW)
      .step(Math.abs(steps), cb);

  this.repl.inject({
    moveMotor,
    stepper,
  });
});

board.on('error', function() {
  status = SERVER_STATUS.ERROR;
  throw new Error(ERROR_MESSAGE.CONNECTING_BOARD_ERROR);
});

const getPosition = () =>
  new Promise((resolve, reject) =>
    getPositionFromDB()
      .then(pos => {
        position = pos;
        resolve(pos);
      })
      .catch(() => reject(ERROR_MESSAGE.DATABASE_GET_ERROR)),
  );

const setPosition = (newPosition = position) =>
  new Promise((resolve, reject) => {
    if (status !== SERVER_STATUS.SUCCESSFUL) {
      return reject(ERROR_MESSAGE.NOT_CONNECTED);
    }

    const steps = calculateSteps(newPosition, position);

    moveMotor(steps, function() {
      setPositionToDB(newPosition)
        .then(pos => {
          position = newPosition;
          resolve(pos);
        })
        .catch(() => reject(ERROR_MESSAGE.DATABASE_INSERT_ERROR));
    });
  });

const getStatus = () => status;

module.exports = {
  getPosition,
  setPosition,
  getStatus,
};
