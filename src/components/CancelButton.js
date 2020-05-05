import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {white, red} from '../assets/colors';

export default props => {
  return (
    <Button
      buttonStyle={[styles.btn, props.style]}
      onPress={props.onClickEvent}
      title={props.title}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: red,
    padding: 8,
    borderRadius: 10,
    margin: 10,
    color: white,
  },
});
