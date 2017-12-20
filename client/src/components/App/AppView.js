import React from 'react';
import Title from '../Title';
import Arrow from '../Arrow';
import RollerBlind from '../RollerBlind';
import Notification from '../Notification';

export default ({ isConnected }) => (
  <div className="container">
    <Title />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '80% 20%'
      }}
    >
      <RollerBlind />
      <div>
        <Arrow />
        <Arrow isGoingDown />
      </div>
    </div>
    <Notification />
  </div>
);
