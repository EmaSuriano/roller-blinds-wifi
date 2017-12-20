import Arrow from './Arrow';
// import Arrow from './Arrow.native';
import { connect } from 'react-redux';
import { moveRollerBlind } from '../../actions/action';

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClick: () => dispatch(moveRollerBlind(props.isGoingDown)),
  };
};

const mapStateToProps = (state, props) => {
  return props;
};

export default connect(mapStateToProps, mapDispatchToProps)(Arrow);
