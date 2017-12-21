import React, { Component } from 'react';
import { Image, View } from 'react-native';
// import { Actions, ActionConst } from 'react-native-router-flux';

// Assets
import splash from './Assets/Logo.png';

// import styles from './styles';

const Splash = ({}) => (
  <View
    style={{
      backgroundColor: '#4A148C',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    }}
  >
    <Image
      source={splash}
      style={{ height: 150, width: 150 }}
      resizeMode="contain"
    />
  </View>
);

export default Splash;
