import React from 'react';
import FontAwesome from 'react-fontawesome';

const Arrow = ({ onClick, isGoingDown }) => (
  <div onClick={onClick}>
    <FontAwesome name={isGoingDown ? 'arrow-down' : 'arrow-up'} size="4x" />
  </div>
);

export default Arrow;