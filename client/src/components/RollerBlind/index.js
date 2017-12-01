import RollerBlind from './RollerBlind';
import { connect } from 'react-redux';
import { getRollerBlindHeight } from '../../selectors/selector';

const mapStateToProps = state => {
  const height = getRollerBlindHeight(state);
  return {
    height,
  };
};

export default connect(mapStateToProps)(RollerBlind);
