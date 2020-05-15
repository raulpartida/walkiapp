import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  ImageBackground,
  RefreshControl,
  FlatList,
} from 'react-native';

import Toast from 'react-native-simple-toast';
import ScreenContainer from '../../components/ScreenContainer';

import IconButton from '../../components/IconButton';
import SubTitleSection from '../../components/SubTitleSection';
import ContainerRow from '../../components/ContainerRow';
import Text from '../../components/Text';
import {baseURL} from '../../Constants';
import AsyncStorage from '@react-native-community/async-storage';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      subsidiaries: [],
      isRefreshing: false,
      userid: '5026cf2c4f9792500eceeaec0a1d773c',
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
      alert(this.state.user.id)
      if (tokenResponse !== null && tokenResponse !== undefined){
        this.setState({token: tokenResponse});
        this.getData();
      }
    } catch (error) {
      console.error('Exception:', error);
    }
  }

  getData(){
    fetch(baseURL+'/user/getFavorite/'+this.state.user.id, {
      method: 'GET',
      async: true,
      headers: {
        'content-type': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((response) => {
        if(response.message){
          this.setState({isRefreshing: false, favorites: [] })
          Toast.showWithGravity('No tienes favoritos agregados.', Toast.LONG, Toast.CENTER);
        }else{
          this.setState({isRefreshing: false, favorites: response.arreglo_jsons_favorites })
        }
    })
    .catch((error) => {
      console.error(error);
    });
  }


  handle = () => {};

  deleteFavorite = (id) => {
    let favorites = this.state.favorites;
    let element;


    element = favorites.findIndex((element) => {
      return element._id === id;
    })

    fetch(baseURL+'/user/deleteFavorite', {
      method: 'DELETE',
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
        favorites.splice(element, 1);
        this.setState({people: favorites});
        Toast.show('Eliminada de favoritos.');
    })
    .catch((error) => {
      console.error(error);
    });
  }

  onRefresh() {
    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
    this.getData();
  }

  render() {
    return (
      <ScreenContainer style={styles.c}>
        <ContainerRow style={styles.c}>
          <IconButton
            name="arrowleft"
            color="#9c9c9c"
            onClickEvent={() => this.props.navigation.goBack()}
          />
          <SubTitleSection value="Favoritos" style={styles.c} />
        </ContainerRow>

        <FlatList
          style={styles.grid}
          data={this.state.favorites}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          renderItem={({item, index}) => {
            return (
              <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Shop', {subsidiaryid: item._id });}}>
                <View style={[styles.item,(index%4 == 0)?styles.marginTop:null ,(index == 0 || (index+1)%4 == 0 || index%4 == 0) ?styles.itemBigger:null]}>
                  <ImageBackground 
                    style={styles.image} 
                    source={{uri: baseURL + "/subsidiary/image/" + item.image}} 
                  />
                  <View style={styles.layer}></View>
                  <View>
                    <Text style={styles.name} value={item.name} />
                  </View>

                  <View style={styles.btn}>
                    <IconButton
                      name="like1"
                      color="#ffffff"
                      onClickEvent={() => this.deleteFavorite(item._id)}
                    />
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

export default Favorites;

const styles = StyleSheet.create({
  c: {},
  grid:{
    width: '100%',
    display: 'flex',
    paddingTop: 30
  },
  item: {
    width: '48%',
    margin: '1.3%',
    height: 200,
    overflow: 'hidden',
    borderRadius: 10
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
  name: {
    position: 'absolute',
    bottom: 10,
    left: 5,
    fontWeight: 'bold',
    color: 'white',
    zIndex: 1
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  btn:{
    position: 'absolute',
    top: 10,
    right: 0,
    zIndex: 1
  }
});
