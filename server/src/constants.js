const SERVER_STATUS = {
  CONNECTING: 'CONNECTING',
  SUCCESSFUL: 'SUCCESSFUL',
  ERROR: 'ERROR',
};

const ERROR_MESSAGE = {
  NOT_CONNECTED: 'Your roller blinds are not connected yet.',
  CONNECTING_BOARD_ERROR: "Can't to your roller blinds, please check the configuration",
  ROLLER_BLINDS_MOVING: 'Your roller blinds are moving right now.',
  DATABASE_GET_ERROR: "Can't get your roller blinds position from database",
  DATABASE_INSERT_ERROR: "Can't save your roller blinds position into database",
};

const ACTIONS = {
  SET_POSITION: 'SET_POSITION',
  SERVER_ERROR: 'SERVER_ERROR',
};

module.exports = {
  SERVER_STATUS,
  ERROR_MESSAGE,
  ACTIONS,
};
