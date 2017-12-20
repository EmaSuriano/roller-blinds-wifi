import {
  MOVE_ROLLER_BLIND,
  SET_POSITION,
  SERVER_ERROR,
  DELETE_NOTIFICATION,
} from '../actions/types';

const initialState = {
  rollerBlindHeight: 0,
  notifications: [],
};

const HEIGHT_MODIFIER = 10;
const MAX_HEIGHT = 100;
const MIN_HEIGHT = 0;

const validateHeight = newHeight => {
  if (newHeight < MIN_HEIGHT) return MIN_HEIGHT;
  if (newHeight > MAX_HEIGHT) return MAX_HEIGHT;
  return newHeight;
};

let notificationCount = 0;

export default function(state = initialState, action) {
  switch (action.type) {
    case MOVE_ROLLER_BLIND: {
      const heightModifier = action.isGoingDown
        ? HEIGHT_MODIFIER
        : -HEIGHT_MODIFIER;

      const rollerBlindHeight = validateHeight(
        state.rollerBlindHeight + heightModifier,
      );

      return Object.assign({}, state, {
        rollerBlindHeight,
      });
    }
    case SET_POSITION: {
      return Object.assign({}, state, {
        rollerBlindHeight: action.position,
      });
    }
    case SERVER_ERROR: {
      notificationCount++;
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            message: action.error,
            key: notificationCount,
          },
        ],
      };
    }
    case DELETE_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications.filter(
          ({ key }) => key !== action.id,
        ),
      };
    }
    default:
      return state;
  }
}
