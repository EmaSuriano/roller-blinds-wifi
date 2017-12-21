import debounce from 'lodash.debounce';
import {
  MOVE_ROLLER_BLIND,
  SET_POSITION_REQUEST,
  DELETE_NOTIFICATION,
  APPLICATION_ERROR,
} from './types';
import { getRollerBlindHeight, isWaitingResponse } from '../selectors/selector';

function sendPosition(dispatch, getState) {
  const position = getRollerBlindHeight(getState());
  dispatch(setRollerBlindPosition(position));
}

export const moveRollerBlindWithArrow = isGoingDown => (dispatch, getState) => {
  const isDisable = isWaitingResponse(getState());
  if (isDisable)
    return dispatch(showError('Your roller blinds are moving right now.'));

  dispatch(moveRolllerBlind(isGoingDown));
  sendPositionDebounced(dispatch, getState);
};

const sendPositionDebounced = debounce(sendPosition, 1000);

const moveRolllerBlind = isGoingDown => {
  return {
    type: MOVE_ROLLER_BLIND,
    isGoingDown,
  };
};

export const setRollerBlindPosition = position => {
  return {
    type: SET_POSITION_REQUEST,
    position,
  };
};

export const deleteNotification = id => {
  return {
    type: DELETE_NOTIFICATION,
    id,
  };
};

export const showError = error => ({
  type: APPLICATION_ERROR,
  error,
});
