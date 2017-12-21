import RollerBlind from './RollerBlind';
import { connect } from 'react-redux';
import {
  getRollerBlindHeight,
  isWaitingResponse,
} from '../../selectors/selector';
import { setRollerBlindPosition, showError } from '../../actions/action';

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
  showError: () => showError('Your roller blinds are moving right now.'),
};

export default connect(mapStateToProps, mapDispatchToprops)(RollerBlind);
