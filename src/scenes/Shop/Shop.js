import React, {Component} from 'react';
import {
  StyleSheet, 
  ImageBackground, 
  View, 
  Text, 
  ScrollView, 
  Animated, 
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import {baseURL} from '../../Constants';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import moment from "moment";

import ScreenContainer from '../../components/ScreenContainer';
import Icon from 'react-native-vector-icons/AntDesign';
import ImageButton from '../../components/ImageButton';
import IconButton from '../../components/IconButton';
import SubTitleSection from '../../components/SubTitleSection';
import ContainerRow from '../../components/ContainerRow';
import ScrollOffers from './components/ScrollOffers';
import SubsidiariesList from './components/SubsidiariesList';
import { greenDark } from '../../assets/colors';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swiped: false,
      favorite: false,
      mall: null,
      subsidiary: [],
      subsidiaries: [],
      departments: [],
      offers: [],
      animationValue : new Animated.Value(250),
      subsidiaryid: this.props.route.params.subsidiaryid,
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
        this.getData();
        this.getFavorites();
        this.getDepartments();
      }
    } catch (error) {
      console.error('Exception:', error);
    }
  }

  getData(){
    fetch(baseURL + '/subsidiary/'+ this.state.subsidiaryid, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((response) => {
        // Save token
        this.setState({subsidiary: response});
        this.getSubsidiaries();
        this.getMall();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getFavorites(){
    let favorites = [];

    fetch(baseURL + '/user/getFavorite/'+ this.state.user.id, {
      method: 'GET',
      async: true,
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((response) => {
        if(!response.message){
          favorites = response.arreglo_jsons_favorites;

          if(favorites.find(item => item._id == this.state.subsidiaryid)){
            this.setState({favorite: true});
          }
        }
    })
    .catch((error) => {
    });
  }

  getSubsidiaries(){
    fetch(baseURL + '/subsidiary/bySeller/'+ this.state.subsidiary.userid, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((response) => {

      if(response.docs && response.docs.length){
        let index = response.docs.findIndex(item => item._id == this.state.subsidiaryid)
        
        
        if (index !== -1) {
          response.docs.splice(index, 1);
          this.setState({subsidiaries: response.docs});
          }

        }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getMall(){
    fetch(baseURL + '/mall/'+ this.state.subsidiary.mallid, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((response) => {
      this.setState({mall: response.name})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getDepartments(){
    fetch(baseURL + '/department/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((response) => {
        if(response.total_rows){
          this.setState({departments: response.rows});
          this.getOffers();
        }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getOffers(){
    fetch(baseURL + '/subsidiary/OffersFromSubsidiary/'+ this.state.subsidiaryid, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((response) => {
        if(response.message){
          const now = moment();

          let offers = response.message.filter(function(item){
            if (now.diff(moment(item.finishDate)) <= 0) {
              return item;
            }
          })

          offers.map((offer) => {
            let currentDepartment = this.state.departments.find(department => department.id == offer.departmentid);

            if (currentDepartment) {
              offer['department'] = currentDepartment.doc.name;
            }
          });

          this.setState({offers: offers})
        }
    })
    .catch((error) => {
      console.error(error);
    });
  }


  toggleAnimation=(direction)=>{
    
    if(direction == 'down' && this.state.swiped){
      Animated.timing(this.state.animationValue, {
        toValue : 250,
        duration : 210
      }).start(()=>{
        this.setState({swiped : false});
      });
    }
    else if(direction == 'up' && !this.state.swiped){
      Animated.timing(this.state.animationValue, {
        toValue : 0,
        duration : 210
      }).start(()=>{
        this.setState({swiped : true});
      });
    }
  }

  toggleFavorite = () => {
    let route = 'addFavorite';
    let method = 'PUT';
    let message = 'Añadido a favoritos';

    if(this.state.favorite){
      route = 'deleteFavorite';
      method = 'DELETE';
      message = 'Eliminado de favoritos';
    }

    fetch(baseURL + '/user/'+ route, {
      method: method,
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      },
      body: JSON.stringify({
        subsidiaryid: this.state.subsidiaryid,
        userid: this.state.user.id
      })
    })
    .then((response) => response.json())
    .then((response) => {
        // Save token
        if(response.ok){
          Toast.show(message, Toast.LONG);
          this.setState({favorite: !this.state.favorite})
        }
    })
    .catch((error) => {
    });
  }

  swipeUp = (gestureState) => {
    this.toggleAnimation('up');
  }

  swipeDown = (gestureState) => {
    this.setState({swiped : true});
    this.toggleAnimation('down');
  }

  toggleSwipe = () =>{
    if(!this.state.swiped){
      this.toggleAnimation('up');
    }else{
      this.toggleAnimation('down');
    }
  }

  handle = () => {};

  render() {
    const transformStyle ={
      transform : [{ 
        translateY : this.state.animationValue,
      }]
    }

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <ScreenContainer style={styles.c}>
        <ContainerRow style={[styles.c, styles.fullHeight]}>

          <View style={styles.prevBtn}>
            <TouchableWithoutFeedback 
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon
                name="arrowleft"
                backgroundColor="transparent"
                size={20}
                color={"#FFF"} />
            </TouchableWithoutFeedback>
          </View>

          <ImageBackground style={styles.cover} source={{uri: baseURL +"/subsidiary/image/"+this.state.subsidiary.image}} />
          <View style={styles.layout}/>

          <Animated.View  style={[styles.swipe,transformStyle]}>
            <GestureRecognizer
              onSwipeUp={(state) => this.swipeUp(state)}
              onSwipeDown={(state) => this.swipeDown(state)}
              config={config}
              style={styles.head}>
                
              <TouchableWithoutFeedback onPress={()=> this.toggleSwipe()}>
                <View style={styles.head__elements}>
                  <View style={styles.flex1}/>
                  <View style={[styles.flex1, styles.center]}>
                    <View style={styles.line}/>
                  </View>
                  <View style={[styles.end, styles.flex1]}>
                    <IconButton
                      color="#4c4c4c"
                      name={(!this.state.favorite)?'like2':'like1'}
                      onClickEvent={() => this.toggleFavorite()}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <Text style={styles.name}>
                {this.state.subsidiary.name}
              </Text>

              <TouchableWithoutFeedback 
                onPress={() => {this.props.navigation.navigate('Mall', {mallid: this.state.subsidiary.mallid })}}>
                <View style={styles.mall}>
                  <Icon color={greenDark} name="tagso" size={23}/>
                  <Text style={styles.mallName}>
                    {this.state.mall}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </GestureRecognizer>
            
            <View style={styles.body}>

              {this.state.subsidiaries.length > 0 &&
                <View style={styles.subsidiaries}>
                  <Text style={styles.subsidiariesText}>
                    Otras sucursales
                  </Text>

                  <SubsidiariesList subsidiaries={this.state.subsidiaries}/>
                </View>
              }

              {(this.state.offers.length)
              ? 
                <View>
                  <Text style={styles.subsidiariesText}>
                    Ofertas vigentes
                  </Text>
                  <ScrollOffers offers={this.state.offers}>
                  </ScrollOffers>
                </View>

              : <Text style={styles.empty}>
                  Actualmente no existen ofertas vigentes
                </Text>
              }
            </View>

          </Animated.View>
        </ContainerRow>
      </ScreenContainer>
    );
  }
}

export default Shop;

const styles = StyleSheet.create({
  c: {
    padding: 0
  },
  fullHeight: {
    height: '100%',
    width: '100%',
    position: 'relative',
    flex: 1,
  },
  swipe:{
    zIndex: 2,
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  cover: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    height: 280,
    zIndex: 1
  },
  layout: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    height: 280,
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,.15)"
  },
  prevBtn: {
    zIndex: 3,
    position: 'absolute',
    width: 30,
    height: 30,
    left: 15,
    top: 15,
  },
  head: {
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
    paddingTop: 15
  },
  head__elements: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mall:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mallName:{
    marginLeft: 5,
    color: greenDark
  },
  flex1:{
    width: '33%'
  },
  line:{
    width: 60,
    borderRadius: 5,
    borderWidth: 4,
    borderColor: "#CfCfCf"
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  end:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  name: {
    display: 'flex',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: "700",
    color: "#444"
  },
  subsidiariesText:{
    color: '#555',
    fontSize: 18
  },
  body:{
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 5
  },
  subsidiaries:{
    marginBottom: 20
  },
  empty:{
    textAlign: 'center',
    marginTop: 60
  }
});

