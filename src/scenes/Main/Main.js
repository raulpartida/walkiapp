import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Text from '../../components/Text';
import ContainerRow from '../../components/ContainerRow';
import IconButton from '../../components/IconButton';
import Logo from '../../assets/images/walki-logo-temp.jpeg';
import {Image} from 'react-native-elements';
import SliderOptions from './components/SliderOptions';
import SliderShops from './components/SliderShops';
import ScrollNews from './components/ScrollNews';
import {white, green} from '../../assets/colors';
import {baseURL} from '../../Constants';
import AsyncStorage from '@react-native-community/async-storage';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: {},
      offers: [],
      categorySelected: '',
      categoryStores: [],
    };
  }

  componentDidMount() {
    this._getStoreInfo();
  }

  _getStoreInfo = async () => {
    try {
      const tokenResponse = await AsyncStorage.getItem('token');
      if (tokenResponse !== null && tokenResponse !== undefined)
        this.setState({token: tokenResponse});

      this._getUserInfo();
      this._getOffersInfo();
      this._getCategoriesInfo('/mall');
    } catch (error) {
      console.error('Exception:', error);
    }
  };

  _getUserInfo = async () => {
    try {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.state.token);
      headers.get('Content-Type');

      let infoUser = await fetch(baseURL + '/user/getLoggedUser', {
        method: 'GET',
        headers: headers,
      })
        .then(response => {
          return response.json();
        })
        .catch(error => {
          console.error('Exception:', error);
          return {};
        });
      this._refreshUserStoreData(infoUser);
    } catch (error) {
      console.log(error);
    }
  };

  _refreshUserStoreData = async data => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.setItem('user', JSON.stringify(data));
      this.setState({user: data});
    } catch (error) {}
  };

  _getOffersInfo = async () => {
    try {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.state.token);
      headers.get('Content-Type');

      let offersInfo = await fetch(baseURL + '/offer', {
        method: 'GET',
        headers: headers,
      })
        .then(response => {
          return response.json();
        })
        .catch(error => {
          console.error('Exception-Offer:', error);
          return {};
        });
      this.setState({offers: offersInfo.rows});
    } catch (error) {
      console.log(error);
    }
  };

  _getCategoriesInfo = async (urlEnd = '') => {
    try {
      console.log('Calling' + urlEnd);

      if (urlEnd !== '') {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.state.token);
        headers.get('Content-Type');

        let result = await fetch(baseURL + urlEnd, {
          method: 'GET',
          headers: headers,
        })
          .then(response => {
            return response.json();
          })
          .catch(error => {
            console.error('Exception:', error);
            return {};
          });

        this.setState({categoryStores: result.rows});
      } else {
        this.setState({categoryStores: []});
      }
    } catch (error) {
      console.log(error);
      a;
    }
  };

  render() {
    const categories = [
      {category: 'Plaza', url: '/mall'},
      {category: 'Restaurante', url: ''},
      {category: 'Departamental', url: '/department'},
      {category: 'Salud', url: ''},
      {category: 'Otros', url: '/subsidiary'},
    ];
    const {user, token} = this.state;

    return (
      <ScreenContainer style={styles.parentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ContainerRow style={styles.headerBar}>
            <IconButton
              text=""
              name="menuunfold"
              color="#9c9c9c"
              onClickEvent={() =>
                this.props.navigation.navigate('Menu', {
                  userName: user.name,
                  itemId: user.id,
                  token: token,
                })
              }
            />
            <Image source={Logo} style={styles.logo} />
          </ContainerRow>
          <Text value="Descubre" style={styles.textLabel} />
          <SliderOptions
            options={categories}
            onItemClickEvent={url => this._getCategoriesInfo(url)}
          />
          <SliderShops
            shops={this.state.categoryStores}
            navigation={this.props.navigation}
            token={token}
          />
          <Text value="Novedades" style={styles.textLabel} />
          {/*<ScrollNews
            navigation={this.props.navigation}
            token={token}
            offers={
              this.state.offers.length > 5
                ? this.state.offers.slice(0, 5)
                : this.state.offers
            }
          />*/}
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: white,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  headerBar: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 70,
    height: 70,
  },
  textLabel: {
    fontSize: 22,
    marginTop: 20,
    marginBottom: 10,
  },
});
