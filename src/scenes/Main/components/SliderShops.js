import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
} from 'react-native';
import Text from '../../../components/Text';
import {green, grayText, white} from '../../../assets/colors';

export default (props) => {
  return (
    <FlatList
      horizontal={true}
      style={props.style}
      data={props.shops}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => {
        return (
          <TouchableWithoutFeedback>
            <View style={styles.item}>
              <ImageBackground source={item.image} style={styles.image} />
              <Text style={styles.textLabel} value={item.name} />
            </View>
          </TouchableWithoutFeedback>
        );
      }}></FlatList>
  );
};

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: grayText,
    marginTop: 10,
    marginBottom: 5,
    maxWidth: '100%',
    maxHeight: 18,
  },
  item: {
    width: 120,
    margin: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    elevation: 7,
    overflow: 'hidden',
  },
});
