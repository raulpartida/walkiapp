import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
} from 'react-native';
import Text from '../../../components/Text';
import {green, grayText, white, black} from '../../../assets/colors';

export default (props) => {
  return (
    <FlatList
      style={styles.scroll}
      data={props.news}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        return (
          <TouchableWithoutFeedback>
            <View style={styles.item}>
              <ImageBackground style={styles.image} source={item.image} />
              <View style={styles.body}>
                <Text style={styles.title} value={item.title} />
                <Text style={styles.description} value={item.description} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      }}></FlatList>
  );
};

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    maxWidth: '100%',
  },
  item: {
    width: '100%',
    maxWidth: '100%',
    height: 100,
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 8,
    overflow: 'hidden',
  },
  image: {
    flex: 2,
    height: '100%',
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: grayText,
  },
  description: {
    color: grayText,
    fontSize: 14,
    fontWeight: '200',
  },
  body: {
    flex: 4,
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    backgroundColor: white,
    padding: 10,
  },
});
