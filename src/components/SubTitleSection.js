import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {graySubTitle} from '../assets/colors';

export default props => {
  return <Text style={[styles.text, props.style]}>{props.value}</Text>;
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    flexWrap: 'wrap',
    color: graySubTitle,
    fontSize: 18,
    fontWeight: '500',
    alignContent: 'center',
    lineHeight: 20,
    marginTop: 10,
  },
});
