import { MOVE_ROLLER_BLIND } from './types';

export const moveRollerBlind = isGoingDown => {
  return {
    type: MOVE_ROLLER_BLIND,
    isGoingDown
  };
};
