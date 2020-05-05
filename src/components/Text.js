import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {grayText} from '../assets/colors';

export default (props) => {
  return (
    <Text style={[styles.text, props.style]} {...props}>
      {props.value}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    flexWrap: 'wrap',
    color: grayText,
    fontSize: 18,
    fontWeight: '500',
    alignContent: 'center',
    lineHeight: 20,
    margin: 10,
  },
});
