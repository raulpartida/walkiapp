import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {background, graySubTitle} from '../assets/colors';

export default (props) => {
  return (
    <Input
      placeholder={props.hint}
      errorMessage={props.errorMessage}
      secureTextEntry={props.secureTextEntry}
      errorStyle={styles.error}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      inputStyle={[styles.input, props.inputStyle]}
      inputContainerStyle={styles.base}
      onChangeText={props.handleInputChange}
      value={props.value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flexWrap: 'wrap',
    color: graySubTitle,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    padding: 10,
    backgroundColor: background,
    borderRadius: 10,
    marginBottom: 10
  },
  base: {
    borderBottomWidth: 0,
    textDecorationColor: 'transparent',
  },
  error: {},
});
