import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
} from 'react-native';
import Text from '../../../components/Text';
import IconButton from '../../../components/IconButton';
import {green, grayText, white, black} from '../../../assets/colors';

export default props => {
  return (
    <FlatList
      style={styles.scroll}
      data={props.offers}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      ListEmptyComponent={() => (
        <View style={styles.emptyComponent}>
          <IconButton name="exception1" color="#9c9c9c" />
          <Text numberOfLines={1} value="No hay novedades." />
        </View>
      )}
      renderItem={({item}) => {
        return (
          <TouchableWithoutFeedback
            onPress={() =>
              props.navigation.push('Promotion', {
                id: item.id,
                token: props.token,
              })
            }>
            <View style={styles.item}>
              <ImageBackground style={styles.image} source={item.doc.image} />
              <View style={styles.body}>
                <Text
                  style={styles.title}
                  numberOfLines={1}
                  value={item.doc.name}
                />
                <Text
                  style={styles.description}
                  numberOfLines={3}
                  value={item.doc.description}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    margin: 15,
    minHeight: 100,
    borderRadius: 10,
    elevation: 7,
  },
  image: {
    flex: 2,
    height: '100%',
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    overflow: 'hidden',
  },
  body: {
    flex: 4,
    maxHeight: '100%',
    backgroundColor: white,
    borderBottomRightRadius: 10,
    borderTopEndRadius: 10,
    padding: 10,
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
  emptyComponent: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: white,
    margin: 15,
    borderRadius: 10,
    elevation: 7,
    justifyContent: 'center',
  },
});
