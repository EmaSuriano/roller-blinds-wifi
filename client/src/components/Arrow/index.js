import Arrow from './Arrow';
import { connect } from 'react-redux';
import { moveRollerBlindWithArrow } from '../../actions/action';

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClick: () => dispatch(moveRollerBlindWithArrow(props.isGoingDown)),
  };
};

export default connect(null, mapDispatchToProps)(Arrow);
