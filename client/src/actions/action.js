import { MOVE_ROLLER_BLIND, SET_ROLLER_BLIND_POSITION } from './types';

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
