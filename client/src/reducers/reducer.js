import {
  MOVE_ROLLER_BLIND,
  SET_ROLLER_BLIND_POSITION,
  SET_POSITION,
} from '../actions/types';

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
      const heightModifier = action.isGoingDown
        ? HEIGHT_MODIFIER
        : -HEIGHT_MODIFIER;

      const rollerBlindHeight = validateHeight(
        state.rollerBlindHeight + heightModifier,
      );

      return {
        rollerBlindHeight,
      };
    }
    case SET_POSITION:
      return {
        rollerBlindHeight: action.position,
      };
    default:
      return state;
  }
}
