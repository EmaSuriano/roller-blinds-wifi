import React from 'react';

import Title from '../Title';
import Arrow from '../Arrow';
import RollerBlind from '../RollerBlind';

export default () => (
  <div className="container">
    <Title />
    <Arrow />
    <RollerBlind />
    <Arrow isGoingUp />
  </div>
);
