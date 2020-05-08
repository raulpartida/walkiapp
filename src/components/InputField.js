import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {
  background,
  graySubTitle,
  grayLigth,
  grayLabel,
  grayText,
} from '../assets/colors';

export default props => {
  return (
    <Input
      placeholder={props.hint}
      errorMessage={props.errorMessage}
      errorStyle={styles.error}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      inputStyle={[styles.input, props.inputStyle]}
      inputContainerStyle={styles.base}
      onChangeText={props.handleInputChange}
      keyboardType={props.type}
      secureTextEntry={props.isSecure}
      returnKeyType={props.keyType}
      autoCorrect={false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flexWrap: 'wrap',
    color: grayText,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    padding: 10,
    backgroundColor: grayLigth,
    borderRadius: 10,
  },
  base: {
    borderBottomWidth: 0,
    textDecorationColor: 'transparent',
  },
  error: {},
});
