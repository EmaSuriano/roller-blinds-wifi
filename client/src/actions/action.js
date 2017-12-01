import { MOVE_ROLLER_BLIND } from './types';

export const moveRollerBlind = isGoingUp => {
  return {
    type: MOVE_ROLLER_BLIND,
    isGoingUp,
  };
};
