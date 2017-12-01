import React from 'react';
import FontAwesome from 'react-fontawesome';

const Arrow = ({ onClick, isGoingUp }) => {
  return (
    <div onClick={onClick}>
      <FontAwesome name="arrow-up" size="4x" flip={isGoingUp ? 'vertical' : undefined} />
    </div>
  );
};

export default Arrow;
