import React from 'react';
import { Text } from 'react-native';

import styles from '../../native/styles';

const Arrow = ({ onClick, isGoingUp }) => {
  return <Text onClick={onClick}>{isGoingUp ? '▲' : '▼'}</Text>;
};

export default Arrow;
