import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {white} from '../assets/colors';

export default (props) => (
  <SafeAreaView style={[styles.container, props.style]}>
    {props.children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    padding: 10,
  },
});
