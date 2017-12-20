import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NotificationStack } from 'react-notification';

class Notification extends Component {
  static propTypes = {
    notificatios: PropTypes.array,
    deleteNotification: PropTypes.func,
  };

  render() {
    return (
      <NotificationStack
        notifications={this.props.notifications}
        onDismiss={({ key }) => this.props.deleteNotification(key)}
      />
    );
  }
}

export default Notification;
