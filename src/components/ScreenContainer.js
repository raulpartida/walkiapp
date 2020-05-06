import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {white} from '../assets/colors';

export default props => (
  <SafeAreaView style={[styles.container, props.style]}>
    {props.children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    padding: 10,
  },
});
