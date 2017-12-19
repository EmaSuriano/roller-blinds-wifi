// import { buildException } from './utils';

const SERVER_STATUS = {
  CONNECTING: 'CONNECTING',
  SUCCESSFUL: 'SUCCESSFUL',
  ERROR: 'ERROR',
};

const ERROR_MESSAGE = {
  NOT_CONNECTED: 'Your roller blinds are not connected yet.',
  CONNECTING_BOARD_ERROR:
    "Can't connect to your roller blinds, please check the configuration",
  ROLLER_BLINDS_MOVING: 'Your roller blinds are moving right now.',
  DATABASE_GET_ERROR: "Can't get your roller blinds position from database",
  DATABASE_INSERT_ERROR: "Can't save your roller blinds position into database",
  UNHANDLED_ERROR: 'Something weird happenned',
};

const ACTIONS = {
  SET_POSITION: 'SET_POSITION',
  SERVER_ERROR: 'SERVER_ERROR',
};

const DEFAULT_ENV = {
  PORT: 3000,
  MOTOR_PINS: [14, 12, 13, 15],
  ETHERPORT_PORT: 3030,
  DEBUG: false,
};

const SERVER_PORT = process.env.PORT || DEFAULT_ENV.PORT;

const MOTOR_PINS = process.env.MOTOR_PIN || DEFAULT_ENV.MOTOR_PINS;

const ETHERPORT_PORT = process.env.ETHERPORT_PORT || DEFAULT_ENV.ETHERPORT_PORT;

const DEBUG = process.env.DEBUG || DEFAULT_ENV.DEBUG;

module.exports = {
  SERVER_STATUS,
  ERROR_MESSAGE,
  ACTIONS,
  SERVER_PORT,
  MOTOR_PINS,
  ETHERPORT_PORT,
  DEBUG,
};
