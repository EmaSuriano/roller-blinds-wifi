import React from 'react';

const RollerBlind = ({ height }) => (
  <div
    style={{
      height: 550,
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#ffffffa8',
      borderRadius: 20,
      padding: 10
    }}
  >
    <h1 style={{ 'margin-top': height * 5 }}>The height is {height}</h1>
  </div>
);

export default RollerBlind;
