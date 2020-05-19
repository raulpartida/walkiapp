import React, {Component} from 'react';
import {
  View, 
  StyleSheet, 
  Text, 
  ImageBackground,
  Animated,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native';

import {baseURL} from '../../Constants';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import ScreenContainer from '../../components/ScreenContainer';
import SubTitleSection from '../../components/SubTitleSection';
import ActionButton from '../../components/ActionButton';
import IconButton from '../../components/IconButton';
import ContainerRow from '../../components/ContainerRow';
import NeutralButton from '../../components/NeutralButton';
import photo from '../../assets/images/profile.jpg';
import Icon from 'react-native-vector-icons/AntDesign';

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

class Mall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      mall: [],
      subsidiaries: [],
      favorites: [],
      mallid: this.props.route.params.mallid,
      swiped: false,
      animationValue : new Animated.Value(250),
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
      }
    } catch (error) {
      console.error('Exception:', error);
    }
  }

  getData(){
    fetch(baseURL + '/mall/'+ this.state.mallid, {
      method: 'GET',
      timeout: 5000, 
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((response) => {
      this.setState({mall: response});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getFavorites(){
    fetch(baseURL + '/user/getFavorite/'+ this.state.user.id, {
      method: 'GET',
      timeout: 5000,
      async: true,
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((response) => {
        if(!response.message){
          this.setState({favorites: response.arreglo_jsons_favorites});
          this.getSubsidiaries();
        }
    })
    .catch((error) => {
    });
  }

  getSubsidiaries(){
    fetch(baseURL + '/subsidiary/', {
      method: 'GET',
      timeout: 5000,
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((response) => {
      let subsidiaries = response.rows;
      const favorites = this.state.favorites;

      subsidiaries = subsidiaries.filter(item => item.doc.mallid == this.state.mallid);

      for (let subsidiary of subsidiaries) {
        let index = favorites.findIndex(item => item._id == subsidiary.id)
        
        if (index !== -1) {
          subsidiary.doc.favorite = true;
        }else{
          subsidiary.doc.favorite = false;
        }
      }

      this.setState({subsidiaries: subsidiaries});
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

  toggleFavorite = (id, state) => {
    let route = 'addFavorite';
    let method = 'PUT';
    let message = 'Añadido a favoritos';

    if(state){
      route = 'deleteFavorite';
      method = 'DELETE';
      message = 'Eliminado de favoritos';
    }

    fetch(baseURL + '/user/'+ route, {
      method: method,
      timeout: 5000,
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      },
      body: JSON.stringify({
        subsidiaryid: id,
        userid: this.state.user.id
      })
    })
    .then((response) => response.json())
    .then((response) => {
        let subsidiaries = this.state.subsidiaries;
        // Save token
        if(response.ok){
          let index = subsidiaries.findIndex(item => item.id == id)
        
          if (index !== -1) {
            subsidiaries[index].doc.favorite = !subsidiaries[index].doc.favorite;
            this.setState({subsidiaries: subsidiaries});
            Toast.show(message, Toast.LONG);
          }
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

  goSubsidiary = (id) =>{
    // alert(id)
    this.props.navigation.push('Shop', {subsidiaryid: id });
  }

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
      <ScreenContainer style={{padding: 0, backgroundColor: white}}>
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

          <ImageBackground style={styles.cover} source={{uri: baseURL +"/mall/image/"+this.state.mall.image}} />
          <View style={styles.layout}/>

          <Animated.View  style={[styles.swipe,transformStyle]}>
            <GestureRecognizer
              onSwipeUp={(state) => this.swipeUp(state)}
              onSwipeDown={(state) => this.swipeDown(state)}
              config={config}
              style={styles.head}>
                
              <TouchableWithoutFeedback onPress={()=> this.toggleSwipe()}>
                <View style={styles.head__elements}>
                  <View style={[styles.flex1, styles.center]}>
                    <View style={styles.line}/>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <Text style={styles.name}>
                {this.state.mall.name}
              </Text>

              <View style={styles.row}>
                <View style={styles.half}>
                  <Text style={styles.subtitle}>
                    Estado:
                  </Text>
                  <Text style={styles.infoText}>
                    {this.state.mall.state}
                  </Text>
                </View>

                <View style={styles.half}>
                  <Text style={styles.subtitle}>
                    Municipio:
                  </Text>
                  <Text style={styles.infoText}>
                    {this.state.mall.city}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text style={styles.subtitle}>
                    Dirección:
                  </Text>
                  <Text style={styles.infoText}>
                    {this.state.mall.address}
                  </Text>
                </View>
              </View>
            </GestureRecognizer>

            <View style={styles.body}>
              <Text style={styles.subsidiariesText}>
                    {"Sucursales en " + this.state.mall.name}
              </Text>

              <FlatList
                style={styles.grid}
                data={this.state.subsidiaries}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={({item, index}) => {
                  return (
                    <TouchableWithoutFeedback onPress={(id) => {this.goSubsidiary(item.id)}}>
                      <View style={styles.item}>
                        <ImageBackground 
                          style={styles.image} 
                          source={{uri: baseURL + "/subsidiary/image/" + item.doc.image}} 
                        />
                        <View style={styles.layer}></View>
                        <View>
                          <Text style={styles.nameSubsidiary}>
                            {item.doc.name}
                          </Text>
                        </View>

                        <View style={styles.btn}>
                          <IconButton
                            name={(item.doc.favorite)?'like1':'like2'}
                            color="#ffffff"
                            onClickEvent={() => this.toggleFavorite(item.id, item.doc.favorite)}
                          />
                        </View>

                      </View>
                    </TouchableWithoutFeedback>
                  );
                }}>
              </FlatList>
            </View>

          </Animated.View>
        </ContainerRow>
      </ScreenContainer>
    );
  }
}

export default Mall;

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
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  line:{
    width: 60,
    borderRadius: 5,
    borderWidth: 4,
    borderColor: "#CfCfCf"
  },
  name: {
    display: 'flex',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: "700",
    color: "#444"
  },
  row: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20
  },
  half:{
    width: '40%'
  },
  subtitle: {
    color: greenDark,
    fontSize: 16,
    fontWeight: 'bold'
  },
  infoText: {
    color: "#666",
    fontSize: 15
  },
  grid:{
    width: '100%',
    display: 'flex'
  },
  item: {
    width: '48%',
    margin: '1.3%',
    height: 200,
    overflow: 'hidden',
    borderRadius: 10,
    position: 'relative'
  },
  itemBigger: {
    height: 200
  },
  image: {
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'cover',
    justifyContent: 'center',
    flex: 1
  },
  nameSubsidiary: {
    position: 'absolute',
    bottom: 10,
    left: 5,
    fontWeight: 'bold',
    color: 'white',
    zIndex: 2,
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  subsidiariesText:{
    color: '#555',
    fontSize: 18,
    paddingTop: 30,
    marginLeft: 10,
    marginBottom: 10
  },
  btn:{
    position: 'absolute',
    top: 10,
    right: 0,
    zIndex: 1
  }
});