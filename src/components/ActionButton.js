import React from 'react';
import {StyleSheet} from 'react-native';
import {white, blue} from '../assets/colors';
import {Button} from 'react-native-elements';

export default props => {
  return (
    <Button
      buttonStyle={[props.style]}
      containerStyle={props.containerStyle}
      onPress={props.onClickEvent}
      title={props.title}
    />
  );
};

const styles = StyleSheet.create({});
