import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {grayTitle} from '../assets/colors';

export default props => {
  return <Text style={[styles.text, props.style]}>{props.value}</Text>;
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    flexWrap: 'wrap',
    color: grayTitle,
    fontSize: 22,
    fontWeight: '700',
    alignContent: 'center',
    lineHeight: 25,
    margin: 10,
  },
});
