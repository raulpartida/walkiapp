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
import moment from "moment";
import ActionButton from '../../components/ActionButton';
import Icon from 'react-native-vector-icons/AntDesign';
import {baseURL} from '../../Constants';
import AsyncStorage from '@react-native-community/async-storage';

import {
  grayText,
  grayLigth,
  grayLabel,
  white,
  red,
  yellow,
  green,
  greenLigth,
  greenDark,
} from '../../assets/colors';

class Beacon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      beaconid: this.props.route.params.beaconid,
      subsidiaryid: null,
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

  getDepartments(departmentid){
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
        let offers = response.arreglo_jsons_superfinal[0].docs

        const now = moment();

        offers = offers.filter(function(item){
          if (now.diff(moment(item.finishDate)) <= 0) {
            return item;
          }
        })

        
        this.setState({subsidiaryid: response.arreglo_jsons_superfinal[0].docs[0].subsidiaryid})
        this.setState({offers: offers})
        this.getDepartments(response.arreglo_jsons_superfinal[0].docs[0].departmentid);
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

        <View style={styles.bodyContainer}>
          {(this.state.department != undefined) &&
            <Text style={styles.pageTitle}>
              {"Ofertas en departamento de " + this.state.department}
            </Text>
          }

          {(this.state.offers.length)?
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
          :<Text style={styles.empty}>
              Actualmente no existen ofertas vigentes
            </Text>
          }
        </View>
        
        <View style={styles.footerContainer}>
          <ActionButton
            title="Ver todas las ofertas"
            style={styles.btn}
            onClickEvent={() => this.props.navigation.navigate('Shop',{'subsidiaryid':this.state.subsidiaryid})}
          />
        </View>
      </ScreenContainer>
    );
  }
}

export default Beacon;

const styles = StyleSheet.create({
  c: {
    width: '100%',
    padding: 0
  },
  pageTitle:{
    color: '#3c3c3c',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center'
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
  },
  bodyContainer: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: "80%",
    padding: 20,
    backgroundColor: 'white',
    zIndex: 1
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: "25%",
    width: "100%",
    backgroundColor: green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    display: 'flex',
    width: 200,
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
    backgroundColor: greenDark
  },
  empty:{
    textAlign: 'center',
    marginTop: 60
  }
});
