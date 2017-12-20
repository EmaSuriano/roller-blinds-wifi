import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RollerBlind extends Component {
    static propTypes = {
        height: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    onDrag = event => {
        const position = event.clientY - 200;
        if (position < 15 || position > 315 ) return;
        this.setState({ position });
    };

    startDrag = event => {
        event.dataTransfer.setDragImage(new Image(), 0, 0);
    };

    endDrag = event => {
        const position = event.clientY - 200;
        this.props.onChange((position-15)/3);
    };

    componentWillMount() {
        this.setState({ position: (this.props.height*3)+15 })
    }

    state = {
        position: 15,
        localHeight: this.props.height,
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
                  <div className="rollerEnd">
                      ...
                  </div>
              </div>
          </div>
      )
  }
}

export default RollerBlind;
