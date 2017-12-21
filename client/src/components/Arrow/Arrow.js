import React from 'react';
import FontAwesome from 'react-fontawesome';

const Arrow = ({ onClick, isGoingDown }) => (
  <div onClick={onClick} style={{ cursor: 'pointer' }}>
    <FontAwesome
      style={{ color: '#e2e2e2' }}
      name={isGoingDown ? 'arrow-down' : 'arrow-up'}
      size="5x"
    />
  </div>
);

export default Arrow;
