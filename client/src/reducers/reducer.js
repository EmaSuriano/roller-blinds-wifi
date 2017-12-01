import { MOVE_ROLLER_BLIND } from '../actions/types';

const initialState = {
  rollerBlindHeight: 0,
};

const HEIGHT_MODIFIER = 10;
const MAX_HEIGHT = 100;
const MIN_HEIGHT = 0;

const validateHeight = newHeight => {
  if (newHeight < MIN_HEIGHT) return MIN_HEIGHT;
  if (newHeight > MAX_HEIGHT) return MAX_HEIGHT;
  return newHeight;
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MOVE_ROLLER_BLIND: {
      const heightModifier = action.isGoingUp ? HEIGHT_MODIFIER : -HEIGHT_MODIFIER;
      return { rollerBlindHeight: validateHeight(state.rollerBlindHeight + heightModifier) };
    }
    default:
      return state;
  }
}
