import TitleView from './TitleView';
import { connect } from 'react-redux';
import { isConnected, isWaitingResponse } from '../../selectors/selector';

const mapStateToProps = state => {
  const connected = isConnected(state);
  const waiting = isWaitingResponse(state);
  const message = !connected
    ? 'Roller Blinds are not connected yet..'
    : waiting
      ? 'Please wait until your roller blinds finished'
      : 'Move up or down from the roller blind or Arrows';
  return {
    message,
  };
};

export default connect(mapStateToProps)(TitleView);
