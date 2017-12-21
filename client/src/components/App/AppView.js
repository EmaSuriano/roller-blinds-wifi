import React from 'react';
import Title from '../Title';
import RollerBlind from '../RollerBlind';
import Notification from '../Notification';
import RemoteControl from '../RemoteControl';

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
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <RollerBlind />
      </div>
      <RemoteControl />
    </div>
    <Notification />
  </div>
);
