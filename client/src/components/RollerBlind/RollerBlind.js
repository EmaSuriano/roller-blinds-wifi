import React, { Component } from 'react';
import PropTypes from 'prop-types';

const INITIAL_HEIGHT = 200;
const MIN_HEIGHT = 50;
const MAX_HEIGHT = 350;
const TOTAL_HEIGHT = 300;

class RollerBlind extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    isDisable: PropTypes.bool.isRequired,
    showError: PropTypes.func,
  };

  state = {
    position: MIN_HEIGHT,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isDisable)
      this.setState({ position: nextProps.height * 3 + MIN_HEIGHT });
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
    debugger;
    const roundedPosition = Math.round((position - MIN_HEIGHT) / 3);
    return this.props.onChange(roundedPosition);
  };

  render() {
    return (
      <div>
        <div className="rollerTop" />
        <div
          onDragStart={this.startDrag}
          onDrag={this.onDrag}
          onDragEnd={this.endDrag}
          className="rollerContainer"
          style={{ height: this.state.position }}
          draggable
        >
          <div className="internalRoller" />
          <div className="rollerEnd">
            <div className="dragButton"> .</div>
          </div>
        </div>
      </div>
    );
  }
}

export default RollerBlind;
