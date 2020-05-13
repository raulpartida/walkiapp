import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {white, red, green} from '../assets/colors';

export default props => {
  return (
    <Button
      buttonStyle={[styles.btnInner]}
      containerStyle={styles.btnContainer}
      onPress={props.onClickEvent}
      title={props.title}
    />
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  btnInner: {
    width: '80%',
    backgroundColor: red,
    borderRadius: 10,
    color: white,
  },
});
