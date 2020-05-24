import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  ImageBackground,
  Text,
  FlatList
} from 'react-native';

import ScreenContainer from '../../components/ScreenContainer';

import Icon from 'react-native-vector-icons/AntDesign';
import {baseURL} from '../../Constants';
import AsyncStorage from '@react-native-community/async-storage';

class Beacon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      beaconid: '6aa07498e6b8910eac4f3147de10a936',
      offers: [],
      subsidiaries: [],
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUwMjZjZjJjNGY5NzkyNTAwZWNlZWFlYzBhMWQ3NzNjIiwicmV2IjoiMy02ODMxZGI2MjgxOTE5YjViOWNkNTc2MmI5ODZiOTE5NiIsIm5hbWUiOiJTZXJnaW8iLCJlbWFpbCI6ImNoZWNvcm9ibGVzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTg5MDg1OTY0fQ.4ttttHOPGreqoHDa0L5fr9Q8dNpVW3oWE5iYnLmhnYU'
    };
  }

  componentDidMount() {
    this.getToken();
  }

  getToken = async () => {
    try {
      const tokenResponse = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      this.setState({user: JSON.parse(user).payload});
      
      if (tokenResponse !== null && tokenResponse !== undefined){
        this.setState({token: tokenResponse});
        this.getOffers();
      }
    } catch (error) {
      console.error('Exception:', error);
    }
  }

  getDepartments(){
    fetch(baseURL + '/department/', {
      method: 'GET',
      timeout: 5000,
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    })
    .then((response) => {
      if(response.total_rows){
        const departmentid = this.state.offers[0].departmentid
        const department = response.rows.find(depa => depa.id == departmentid)
        this.setState({department: department.doc.name})
      }
    });
  }

  getOffers(){
    fetch(baseURL+'/beacon/getOffers/'+this.state.beaconid, {
      method: 'GET',
      async: true,
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((response) => {
      if(response.arreglo_jsons_superfinal){
        this.setState({offers: response.arreglo_jsons_superfinal[0].docs})
        this.getDepartments();
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }


  handle = () => {};


  render() {
    return (
      <ScreenContainer style={styles.c}>

        <FlatList
          style={styles.scroll}
          data={this.state.offers}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {this.props.navigation.navigate('Promotion', {offerid: item._id })}}
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
                      {this.state.department}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}>

        </FlatList>
      </ScreenContainer>
    );
  }
}

export default Beacon;

const styles = StyleSheet.create({
  c: {
    paddingTop: 30
  },
  image:{
    width: 140,
    height: 90,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#DFDFDF'
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
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  title:{
    fontSize: 15,
    color: '#111'
  },
  department:{
    fontSize: 13,
    color: '#888',
    textDecorationColor: '#888'
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
