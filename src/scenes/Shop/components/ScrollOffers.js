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
        data={props.offers}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {navigation.navigate('Promotion', {offerid: item._id })}}
            >
              <View style={styles.item}>
                <ImageBackground style={styles.image} source={{uri: baseURL + "/offer/image/"+ item.image}} />
                { item.type === "1" &&
                  <View style={styles.specialOffer}>
                    <Icon
                      name="star"
                      size={13}
                      color="white" 
                    />
                  </View>
                }

                <View style={styles.body}>
                  <Text style={styles.title}>
                    {item.name}
                  </Text>
                  <Text style={styles.department}>
                    {item.department}
                  </Text>
                </View>
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
    width: 140,
    height: 90,
    borderRadius: 10,
    overflow: 'hidden'
  },
  item: {
    width: '100%',
    maxWidth: '100%',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
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
    fontSize: 15,
    color: '#333'
  },
  department:{
    fontSize: 13,
    color: '#888',
    textDecorationColor: '#888',
  },
  specialOffer:{
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: "#F9C70C",
    padding: 5,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    elevation: 5
  }
});
