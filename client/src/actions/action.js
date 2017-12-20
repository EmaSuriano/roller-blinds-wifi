import {
  MOVE_ROLLER_BLIND,
  SET_POSITION_REQUEST,
  DELETE_NOTIFICATION
} from './types';

export const moveRollerBlind = isGoingDown => {
  return {
    type: MOVE_ROLLER_BLIND,
    isGoingDown
  };
};

export const setRollerBlindPosition = position => {
  return {
    type: SET_POSITION_REQUEST,
    position
  };
};

export const deleteNotification = id => {
  return {
    type: DELETE_NOTIFICATION,
    id
  };
};
