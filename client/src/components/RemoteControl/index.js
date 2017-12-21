import RemoteControl from './RemoteControl';
import { connect } from 'react-redux';
import {
  getRollerBlindHeight,
  isWaitingResponse,
} from '../../selectors/selector';
import { setRollerBlindPosition } from '../../actions/action';

const mapStateToProps = state => {
  const height = getRollerBlindHeight(state);
  const isDisable = isWaitingResponse(state);
  return {
    height,
    isDisable,
  };
};

const mapDispatchToprops = {
  onChange: setRollerBlindPosition,
};

export default connect(mapStateToProps, mapDispatchToprops)(RemoteControl);
