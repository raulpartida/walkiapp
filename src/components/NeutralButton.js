import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {grayText} from '../assets/colors';

export default (props) => {
  return (
    <Button
      buttonStyle={[styles.btn, props.style]}
      type="clear"
      onPress={props.onClickEvent}
      title={props.title}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    color: grayText,
    textAlign: 'center',
  },
});
