import React from 'react';
import { View } from 'react-native';
// import Title from '../Title';
// import Arrow from '../Arrow';
import RollerBlind from '../RollerBlind';
import Splash from '../Splash';

export default ({ isConnected }) =>
  isConnected ? <Splash /> : <RollerBlind />;
