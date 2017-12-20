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
          display: 'flex',
          justifyContent: 'space-evenly',
          height: '100%',
      }}
    >
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
        }}>
            <RollerBlind />
        </div>
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
        }}>
            <Arrow />
            <Arrow isGoingDown />
        </div>
    </div>
    <Notification />
  </div>
);
