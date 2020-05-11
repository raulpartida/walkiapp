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

import img1 from '../../assets/images/img1.jpg';
import img2 from '../../assets/images/img2.jpg';
import img3 from '../../assets/images/img3.jpg';
import img4 from '../../assets/images/img4.jpg';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      subsidiaries: [],
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this.getData();
    alert("Hey")
  }

  getData(){
    const userid = '5026cf2c4f9792500eceeaec0a1d773c';
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUwMjZjZjJjNGY5NzkyNTAwZWNlZWFlYzBhMWQ3NzNjIiwicmV2IjoiMy02ODMxZGI2MjgxOTE5YjViOWNkNTc2MmI5ODZiOTE5NiIsIm5hbWUiOiJTZXJnaW8iLCJlbWFpbCI6ImNoZWNvcm9ibGVzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTg5MDg1OTY0fQ.4ttttHOPGreqoHDa0L5fr9Q8dNpVW3oWE5iYnLmhnYU';

    fetch('https://walki.us-south.cf.appdomain.cloud/api/user/getFavorite/'+userid, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': token
      }
    })
    .then((response) => response.json())
    .then((response) => {
        if(!response.message.length){
          this.setState({isRefreshing: false, favorites: [] })
          Toast.showWithGravity('No tienes favoritos agregados.', Toast.LONG, Toast.CENTER);
        }else{
          this.getSubsidaries();
          alert(JSON.stringify(response))
        }
    })
    .catch((error) => {
      console.error(error);
    });
  }


  getSubsidaries(){
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUwMjZjZjJjNGY5NzkyNTAwZWNlZWFlYzBhMWQ3NzNjIiwicmV2IjoiMy02ODMxZGI2MjgxOTE5YjViOWNkNTc2MmI5ODZiOTE5NiIsIm5hbWUiOiJTZXJnaW8iLCJlbWFpbCI6ImNoZWNvcm9ibGVzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTg5MDg1OTY0fQ.4ttttHOPGreqoHDa0L5fr9Q8dNpVW3oWE5iYnLmhnYU';

    fetch('https://walki.us-south.cf.appdomain.cloud/api/subsidiary', {
      method: 'GET',
      async: false,
      headers: {
        'Authorization': token
      }
    })
    .then((response) => response.json())
    .then((response) => {
      this.setState({isRefreshing: false, subsidiaries: [response.rows] })
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
      return element.id === id;
    })

    favorites.splice(element, 1);
    this.setState({people: favorites});
    Toast.show('Eliminada de favoritos.');
  }

  onRefresh() {
    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
    this.getData();
    // const url = `https://api.stackexchange.com/2.2/users?page=1&order=desc&sort=reputation&site=stackoverflow`;
    // axios.get(url)
    //   .then(res => {
    //     let data = res.data.items
    //     this.setState({ isRefreshing: false, data: data }) // false isRefreshing flag for disable pull to refresh indicator, and clear all data and store only first page data
    //   })
    //   .catch(error => {
    //     this.setState({ isRefreshing: false, error: 'Something just went wrong' }) // false isRefreshing flag for disable pull to refresh
    //   });
  }

  render() {
    return (
      <ScreenContainer style={styles.c}>
        <ContainerRow style={styles.c}>
          <IconButton
            name="arrowleft"
            color="#9c9c9c"
            onClickEvent={() => this.prop.navigation.goBack()}
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
              <TouchableWithoutFeedback>
                <View style={[styles.item,(index%4 == 0)?styles.marginTop:null ,(index == 0 || (index+1)%4 == 0 || index%4 == 0) ?styles.itemBigger:null]}>
                  <ImageBackground style={styles.image} source={item.image} />
                  <View style={styles.layer}></View>
                  <View>
                    <Text style={styles.name} value={item.name} />
                  </View>

                  <View style={styles.btn}>
                    <IconButton
                      name="like1"
                      color="#ffffff"
                      onClickEvent={() => this.deleteFavorite(item.id)}
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

export default Login;

const styles = StyleSheet.create({
  c: {},
  grid:{
    width: '100%',
    display: 'flex'
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
