import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {baseURL} from '../../../Constants';
import { useNavigation } from '@react-navigation/native';

export default props => {
  const navigation = useNavigation();

  return ( 
    <FlatList
      style={styles.scroll}
      data={props.subsidiaries}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => {
        return (
          <TouchableWithoutFeedback 
            onPress={() => {navigation.push('Shop', {subsidiaryid: item._id })}}
          >
            <View style={styles.item}>
              <ImageBackground style={styles.image} source={{uri: baseURL + "/subsidiary/image/"+ item.image}} />
              <Text style={styles.title}>
                {item.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      }}>
      </FlatList>
  );
};


const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    maxWidth: '100%',
  },
  image:{
    width: 160,
    height: 95,
    borderRadius: 10,
    overflow: 'hidden'
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    marginLeft: 5,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 13,
    overflow: 'hidden'
  },
  body:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  title:{
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#888'
  }
});
