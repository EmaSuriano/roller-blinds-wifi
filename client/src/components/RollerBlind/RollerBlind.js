import React from 'react';
import ReactSimpleRange from 'react-simple-range';

const RollerBlind = ({ height, onChange }) => (
  <ReactSimpleRange
    vertical
    value={height}
    trackColor="black"
    thumbColor="black"
    sliderSize={20}
    verticalSliderHeight="500px"
    onChangeComplete={({ value }) => onChange(value)}
  />
);

export default RollerBlind;
