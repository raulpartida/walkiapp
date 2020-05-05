import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {grayLabel} from '../assets/colors';

export default props => {
  return <Text style={[styles.text, props.style]}>{props.value}</Text>;
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    flexWrap: 'wrap',
    color: grayLabel,
    fontSize: 14,
    fontWeight: '400',
    alignContent: 'center',
    lineHeight: 18,
    margin: 10,
  },
});
