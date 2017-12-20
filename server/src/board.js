const j5 = require('johnny-five');
const EtherPort = require('etherport');
const {
  BOARD_STATUS,
  ERROR_MESSAGE,
  ETHERPORT_PORT,
  MOTOR_PINS,
  EXCEPTIONS,
  DISABLE_BOARD
} = require('./constants');

function Board() {
  this.status = BOARD_STATUS.CONNECTING;
  this.isMoving = false;
  this.moveMotor = async () => {
    throw new Error(ERROR_MESSAGE.NOT_CONNECTED);
  };

  const board = new j5.Board({
    port: new EtherPort(ETHERPORT_PORT),
    timeout: 1e5
  });

  board.on('ready', () => {
    this.status = BOARD_STATUS.SUCCESSFUL;

    const stepper = new j5.Stepper({
      type: j5.Stepper.TYPE.FOUR_WIRE,
      stepsPerRev: 96,
      pins: MOTOR_PINS
    });

    moveMotor = steps =>
      new Promise(resolve =>
        stepper
          .rpm(300)
          .direction(
            steps > 0 ? j5.Stepper.DIRECTION.CCW : j5.Stepper.DIRECTION.CW
          )
          .step(Math.abs(steps), resolve)
      );

    this.moveMotor = async steps => {
      if (this.isMoving === true) {
        throw new Error(ERROR_MESSAGE.ROLLER_BLINDS_MOVING);
      }
      this.isMoving = true;
      await moveMotor(steps);
      this.isMoving = false;
    };
  });

  board.on('error', error => {
    this.status = BOARD_STATUS.ERROR;
    console.error(ERROR_MESSAGE.CONNECTING_BOARD_ERROR);
  });
}

function BoardDisable() {
  console.log('BOARD SUCCESSFULLY DISABLED!');
  this.status = BOARD_STATUS;
  this.isMoving = false;

  const moveMotor = steps =>
    new Promise(resolve => setTimeout(resolve, Math.abs(steps)));

  this.moveMotor = async steps => {
    if (this.isMoving === true) {
      throw new Error(ERROR_MESSAGE.ROLLER_BLINDS_MOVING);
    }
    this.isMoving = true;
    await moveMotor(steps);
    this.isMoving = false;
  };
}

module.exports = DISABLE_BOARD ? BoardDisable : Board;
