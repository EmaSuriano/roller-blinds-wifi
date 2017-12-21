import uuid from 'uuid';
import {
  MOVE_ROLLER_BLIND,
  SET_POSITION,
  SERVER_ERROR,
  DELETE_NOTIFICATION,
  SOCKET_CONNECTED,
  SET_POSITION_REQUEST,
} from '../actions/types';

const initialState = {
  rollerBlindHeight: 0,
  notifications: [],
  isWaitingResponse: false,
  isSocketConnected: false,
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

      return Object.assign({}, state, {
        rollerBlindHeight,
      });
    }
    case SET_POSITION_REQUEST: {
      return Object.assign({}, state, {
        isWaitingResponse: true,
      });
    }
    case SOCKET_CONNECTED: {
      return Object.assign({}, state, {
        isSocketConnected: true,
      });
    }
    case SET_POSITION: {
      return Object.assign({}, state, {
        rollerBlindHeight: action.position,
        isWaitingResponse: false,
      });
    }
    case SERVER_ERROR: {
      return {
        ...state,
        isWaitingResponse: false,
        notifications: [
          ...state.notifications,
          {
            message: action.error,
            key: uuid.v1(),
            dismissAfter: 5000,
          },
        ],
      };
    }
    case DELETE_NOTIFICATION: {
      const notifications = state.notifications.filter(
        ({ key }) => key !== action.id,
      );
      return {
        ...state,
        notifications,
      };
    }
    default:
      return state;
  }
}
