import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import Text from '../../../components/Text';
import {green, grayText, white} from '../../../assets/colors';

export default (props) => {
  return (
    <ScrollView
      horizontal={true}
      style={styles.scrollBar}
      showsHorizontalScrollIndicator={false}>
      {props.options.map(function (option) {
        return (
          <TouchableWithoutFeedback>
            <View>
              <Text style={styles.discoverStyle} value={option} />
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  discoverStyle: {
    marginEnd: 30,
    fontSize: 17,
    color: grayText,
  },
  scrollBar: {
    width: '100%',
    flex: 1,
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
