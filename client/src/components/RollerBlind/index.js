import RollerBlind from './RollerBlind';
import { connect } from 'react-redux';
import { getRollerBlindHeight } from '../../selectors/selector';
import { setRollerBlindPosition } from '../../actions/action';

const mapStateToProps = state => {
  const height = getRollerBlindHeight(state);
  return {
    height,
  };
};

const mapDispatchToprops = {
  onChange: setRollerBlindPosition,
};

export default connect(mapStateToProps, mapDispatchToprops)(RollerBlind);
