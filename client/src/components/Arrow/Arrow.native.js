import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-fa-icons';

import styles from '../../native/styles';

const Arrow = ({ onClick, isGoingDown }) => {
  return (
    <View>
      <TouchableOpacity onPress={onClick} onLongPress={onClick}>
        <Text style={{ color: '#2c3e50', fontSize: 60 }}>
          <Icon name="fa-arrow-up" style={{ fontSize: 45, color: 'green' }} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Arrow;
