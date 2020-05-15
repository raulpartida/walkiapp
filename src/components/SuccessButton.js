import React from 'react';
import {StyleSheet} from 'react-native';
import {white, green} from '../assets/colors';
import {Button} from 'react-native-elements';

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
    backgroundColor: green,
    height: 50
  },
});
