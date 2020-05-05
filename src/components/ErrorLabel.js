import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {red} from '../assets/colors';

export default props => {
  return <Text style={[styles.text, props.style]}>{props.value}</Text>;
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    flexWrap: 'wrap',
    color: red,
    fontSize: 13,
    fontWeight: '400',
    alignContent: 'center',
    lineHeight: 15,
    margin: 5,
  },
});
