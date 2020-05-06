import React from 'react';
import {StyleSheet, View} from 'react-native';
import {red} from '../assets/colors';

export default props => {
  return <View style={[styles.base, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
