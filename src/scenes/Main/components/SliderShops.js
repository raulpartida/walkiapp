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
import {green, grayText, white} from '../../../assets/colors';

export default props => {
  return (
    <FlatList
      horizontal={true}
      data={props.shops}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      ListEmptyComponent={() => (
        <View style={styles.emptyComponent}>
          <IconButton name="exception1" color="#9c9c9c" />
          <Text
            numberOfLines={12}
            style={{textAlign: 'center', fontSize: 14}}
            value="Tiendas no disponibles"
          />
        </View>
      )}
      renderItem={({item, index}) => {
        return (
          <TouchableWithoutFeedback
            onPress={() => props.onItemClickEvent(item.id)}>
            <View style={styles.item}>
              <ImageBackground source={item.image} style={styles.image} />
              <Text
                style={styles.textLabel}
                numberOfLines={1}
                value={item.doc.name}
              />
            </View>
          </TouchableWithoutFeedback>
        );
      }}
    />
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
  emptyComponent: {
    width: 120,
    height: 150,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: white,
    margin: 5,
    borderRadius: 10,
    elevation: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
