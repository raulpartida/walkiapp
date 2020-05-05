import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {green} from '../assets/colors';
import {Image} from 'react-native-elements';

export default props => {
  return (
    <TouchableWithoutFeedback onPress={props.onClickEvent}>
      <Image
        source={{uri: props.url}}
        containerStyle={[styles.container, props.style]}
        PlaceholderContent={<ActivityIndicator size="small" color={green} />}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
});
