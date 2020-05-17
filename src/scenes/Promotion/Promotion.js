import React, {Component} from 'react';
import {baseURL} from '../../Constants';
import AsyncStorage from '@react-native-community/async-storage';
import moment from "moment";

import {View, StyleSheet, Text, ScrollView, Image, Dimensions} from 'react-native';
import Barcode from "react-native-barcode-builder";
import ScreenContainer from '../../components/ScreenContainer';
import SubTitleSection from '../../components/SubTitleSection';
import ActionButton from '../../components/ActionButton';
import IconButton from '../../components/IconButton';
import ContainerRow from '../../components/ContainerRow';
import Icon from 'react-native-vector-icons/AntDesign';
import NeutralButton from '../../components/NeutralButton';
import photo from '../../assets/images/profile.jpg';
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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class Promotion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offer: [],
      offerid: this.props.route.params.offerid,
      token: null,
      user: null,
      department: null,
      modalOpened: false
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
        this.getData();
      }
    } catch (error) {
      console.error('Exception:', error);
    }
  }

  getData = () =>{
    fetch(baseURL + '/offer/'+ this.state.offerid, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((response) => {
        // Save token
        this.setState({offer: response});
        this.getDepartments();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getDepartments(){
    fetch(baseURL + '/department/'+ this.state.offer.departmentid, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((response) => {
        this.setState({department : response.name})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  handle = () => {};

  render() {
    return (
      <ScreenContainer style={{padding: 0, backgroundColor: white}}>
          <View style={styles.bodyContainer}>
            <ContainerRow style={{marginBottom: 30}}>
              <IconButton
                text=""
                name="arrowleft"
                color="#9c9c9c"
                onClickEvent={() => this.props.navigation.goBack()}
              />

              { this.state.offer.type === "1" &&
                <View style={styles.specialOffer}>
                  <Icon
                    name="star"
                    size={18}
                    color="white" 
                  />
                  <Text style={styles.label}>Oferta Walki</Text>
                </View>
              }
            </ContainerRow>


            <Image style={styles.imagePromotion} source={{uri: baseURL+"/offer/image/"+this.state.offer.image}} />
            <Text style={styles.department}>
              {this.state.department}
            </Text>
            
            <Text style={styles.title}>
              {this.state.offer.name}
            </Text>


            <ScrollView style={styles.descriptionContainer}>
              <Text style={styles.description}>
                {this.state.offer.description}
              </Text>
            </ScrollView>

            <Text style={styles.finalDate}>
              Termina el {moment(this.state.offer.finishDate).format("DD/MM/YYYY")}
            </Text>
          </View>


          { this.state.offer.type === "1" &&
            <View style={styles.footerContainer}>
              <ActionButton
                title="Redimir"
                style={styles.btn}
                onClickEvent={() => this.setState({modalOpened: true})}
              />
            </View>
          }

          {this.state.modalOpened == true &&
          <View 
            style={styles.overlay}
          >
            <TouchableWithoutFeedback 
              onPress={() => this.setState({modalOpened: false})}
              style={styles.fullHeight}
            >
              <View style={styles.modal}>
                  <Barcode 
                    width={1}
                    value={this.state.offer.sku} 
                    format="CODE128" 
                  />
                  <Text style={styles.modalText}>
                    Muestra este código en caja.
                  </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        }
      </ScreenContainer>
    );
  }
}

export default Promotion;

const styles = StyleSheet.create({
  bodyContainer: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: "80%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: white,
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
  imagePromotion: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  department: {
    color: greenDark,
    fontWeight: 'bold',
    marginTop: 5
  },
  specialOffer: {
    backgroundColor: "#F9C70C",
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5
  },
  label:{
    fontWeight: '700',
    color: white,
    marginLeft: 5,
    fontSize: 12,
    textTransform: 'uppercase'
  },
  title: {
    fontSize: 22,
    marginTop: 15,
    lineHeight: 24,
    color: "#333",
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center'
  },
  descriptionContainer:{
    marginTop: 20,
    position: "relative",
    width: "100%",
    flexGrow: 1,
    fontSize: 16
  },
  description:{
    textAlign: 'center'
  },
  finalDate: {
    color: "#888",
    fontSize: 15
  },
  btn: {
    display: 'flex',
    width: 200,
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
    backgroundColor: greenDark
  },
  overlay:{
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: "rgba(0,0,0,.75)",
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullHeight:{
    height: '100%',
    width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: '90%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalText: {
    color: greenDark,
    fontWeight: 'bold'
  }
});
