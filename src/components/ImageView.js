import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {green} from '../assets/colors';
import {Image} from 'react-native-elements';

export default props => {
  return (
    <Image
      source={props.url}
      containerStyle={[styles.container, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
});
