import React from 'react';

const RollerBlind = ({ height }) => (
  <div
    style={{
      height: '550px',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#ffffffa8',
      borderRadius: '20px',
      padding: '10px',
    }}
  >
    <h1 style={{ 'margin-top': height * 5 + 'px' }}>The height is {height}</h1>
  </div>
);

export default RollerBlind;
