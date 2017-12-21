import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const SQUARE_DIMENSIONS = 20;
const { height, width } = Dimensions.get('window');

export default class RollerBlind extends Component {
  static propTypes = {
    height: PropTypes.number,
  };
  static defaultProps = {
    height: 0,
  };

  state = {
    pan: new Animated.ValueXY(),
  };

  componentWillMount() {
    this._animatedValueX = 0;
    this._animatedValueY = this.props.height;
    this.state.pan.x.addListener(value => (this._animatedValueX = value.value));
    this.state.pan.y.addListener(value => (this._animatedValueY = value.value));

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this._animatedValueX,
          y: this._animatedValueY,
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gestureState) => {
        // custom logic here
        let elStringy = JSON.stringify(this.state.pan.y);
        Animated.event([
          null,
          {
            dx: this.state.pan.x,
            dy: this.state.pan.y,
          },
        ])(e, gestureState); // <<--- INVOKING HERE!
      },
      onPanResponderRelease: () => {
        // alert(height);
        let valorparseado = JSON.stringify(this.state.pan.y) * 1 + 10;
        let variableNueva = valorparseado * 100 / height;

        if (variableNueva < 0) {
          variableNueva = 0;
        } else if (variableNueva > 60) {
          variableNueva = 60;
        }

        let rdo = variableNueva * 10 / 6;
        //redux :D

        this.props.onChange(rdo);
        // Animated.spring(this.state.pan);
        // alert(JSON.stringify(this.state.pan.y)); //Shows an object with X and Y coords
      },
    });
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }
  getStyleRoller() {
    return [
      styles.roller,
      {
        height: this.state.pan.y,
      },
    ];
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer} />
        <Animated.View style={this.getStyleRoller()} />
        <Animated.View
          style={styles.square}
          {...this._panResponder.panHandlers}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A148C',
    alignItems: 'center',
  },
  subcontainer: {
    marginTop: 100,
    width: width / 1.5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 33,
    backgroundColor: '#9B51E0',
  },
  square: {
    width: SQUARE_DIMENSIONS + 10,
    height: SQUARE_DIMENSIONS,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#E3E3E3',
  },
  roller: {
    backgroundColor: '#E3E3E3',
    height: 20,
    width: width / 1.5,
    paddingTop: 35,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    maxHeight: 400,
  },
});
