import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Arrow from './Arrow';

class RemoteControl extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    isDisable: PropTypes.bool.isRequired,
  };

  onChangePosition = isGoingDown => {};

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '300px',
          display: 'flex',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
        }}
      >
        <Arrow onClick={this.onChangePosition} />
        <Arrow isGoingDown onClick={this.onChangePosition} />
      </div>
    );
  }
}

export default RemoteControl;
