import Arrow from './Arrow';
import { connect } from 'react-redux';
import { moveRollerBlind } from '../../actions/action';

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClick: () => dispatch(moveRollerBlind(props.isGoingDown)),
  };
};

export default connect(null, mapDispatchToProps)(Arrow);
