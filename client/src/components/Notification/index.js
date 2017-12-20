import Notification from './Notification';
import { connect } from 'react-redux';
import { getNotifications } from '../../selectors/selector';
import { deleteNotification } from '../../actions/action';

const mapStateToProps = state => {
  const notifications = getNotifications(state);
  return {
    notifications,
  };
};

const mapDispatchToProps = {
  deleteNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
