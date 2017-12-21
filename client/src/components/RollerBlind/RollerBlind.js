import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RollerBlind extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    isDisable: PropTypes.bool.isRequired,
  };

  state = {
    position: 15,
  };

  componentWillMount() {
    this.setState({ position: this.props.height * 3 + 15 });
  }

  onDrag = event => {
    if (this.props.isDisable) return;
    const position = event.clientY - 200;
    if (position < 15 || position > 315) return;
    return this.setState({ position });
  };

  startDrag = event => {
    event.dataTransfer.setDragImage(new Image(), 0, 0);
    event.dataTransfer.setData('text/plain', '');
  };

  endDrag = event => {
    if (this.props.isDisable) return;
    const position = event.clientY - 200;
    return this.props.onChange((position - 15) / 3);
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
