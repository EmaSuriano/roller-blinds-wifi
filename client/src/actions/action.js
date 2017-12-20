import {
  MOVE_ROLLER_BLIND,
  SET_ROLLER_BLIND_POSITION,
  DELETE_NOTIFICATION,
} from './types';

export const moveRollerBlind = isGoingDown => {
  return {
    type: MOVE_ROLLER_BLIND,
    isGoingDown,
  };
};

export const setRollerBlindPosition = position => {
  return {
    type: SET_ROLLER_BLIND_POSITION,
    position,
  };
};

export const deleteNotification = id => {
  return {
    type: DELETE_NOTIFICATION,
    id,
  };
};
