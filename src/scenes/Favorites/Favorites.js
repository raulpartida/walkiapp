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
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData(){
    let data = [
      {
        id: 1,
        image: img1,
        name: 'Zara'
      },
      {
        id: 2,
        image: img2,
        name: 'Forever 21'
      },
      {
        id: 3,
        image: img3,
        name: 'Bershka'
      },
      {
        id: 4,
        image: img4,
        name: 'Pull & Bear'
      },
      {
        id: 5,
        image: img1,
        name: 'Vans'
      },
      {
        id: 6,
        image: img2,
        name: 'BestBuy'
      },
      {
        id: 7,
        image: img3,
        name: 'Tienda 3'
      },
      {
        id: 8,
        image: img4,
        name: 'Tienda 3'
      },
    ]

    this.setState({isRefreshing: false, favorites: data })
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
    height: 250,
    overflow: 'hidden',
    borderRadius: 10
  },
  itemBigger: {
    height: 250
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
