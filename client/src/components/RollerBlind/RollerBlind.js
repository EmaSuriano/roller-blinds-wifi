import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSimpleRange from 'react-simple-range';

class RollerBlind extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({ localHeight: nextProps.height });
  }

  state = {
    localHeight: this.props.height
  };

  onChange = ({ value }) => {
    this.setState({ localHeight: value });
    this.props.onChange(value);
  };

  isEnable = () => this.props.height === this.state.localHeight;

  render() {
    return this.isEnable() ? (
      <ReactSimpleRange
        vertical
        value={this.state.localHeight}
        trackColor="black"
        thumbColor="black"
        sliderSize={20}
        verticalSliderHeight="500px"
        onChangeComplete={this.onChange}
      />
    ) : (
      <p>Is Disabled</p>
    );
  }
}

export default RollerBlind;
