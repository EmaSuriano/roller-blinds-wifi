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
        style: 'none',
    };

    render() {
      return (
          <div>
              <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  backgroundColor: '#A700DA',
                  height: '20px',
                  width: '200px',
                  borderRadius: '10px 10px 0 0',
                  boxShadow: '0 3px 5px #333',
              }}/>
              <div
                  onDragStart={this.startDrag}
                  onDrag={this.onDrag}
                  onDragEnd={this.endDrag}
                  className={this.props.style}
                  style={{
                      height: this.state.position,
                      width: '200px',
                      backgroundColor: '#E2E2E2',
                      boxShadow: '0 3px 5px #333',
                      position: 'absolute',
                  }}
                  draggable
              >
                  <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      height: '100%',
                  }}>
                      ...
                  </div>
              </div>
          </div>
      )
  }
}

export default RollerBlind;
