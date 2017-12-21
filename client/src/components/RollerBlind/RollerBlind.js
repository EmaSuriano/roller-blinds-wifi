import React, { Component } from 'react';
import PropTypes from 'prop-types';

const INITIAL_HEIGHT = 200;
const MIN_HEIGHT = 15;
const MAX_HEIGHT = 315;

class RollerBlind extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    isDisable: PropTypes.bool.isRequired,
    showError: PropTypes.func,
  };

  state = {
    position: 15,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isDisable)
      this.setState({ position: nextProps.height * 3 + 15 });
  }

  onDrag = event => {
    if (this.props.isDisable) return;
    const position = event.clientY - INITIAL_HEIGHT;
    if (position < MIN_HEIGHT || position > MAX_HEIGHT) return;
    return this.setState({ position });
  };

  startDrag = event => {
    event.dataTransfer.setDragImage(new Image(), 0, 0);
  };

  validatePosition = position => {
    if (position < MIN_HEIGHT) return MIN_HEIGHT;
    if (position > MAX_HEIGHT) return MAX_HEIGHT;
    return position;
  };

  endDrag = event => {
    if (this.props.isDisable) return this.props.showError();
    const position = this.validatePosition(event.clientY - INITIAL_HEIGHT);
    return this.props.onChange((position - MIN_HEIGHT) / 3);
  };

  render() {
    return (
      <div>
        <div className="rollerTop" />
        <div
          onDragStart={this.startDrag}
          onDrag={this.onDrag}
          onDragEnd={this.endDrag}
          className="roller"
          style={{ height: this.state.position }}
          draggable
        >
          <div className="rollerEnd">...</div>
        </div>
      </div>
    );
  }
}

export default RollerBlind;
