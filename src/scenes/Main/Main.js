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
import img1 from '../../assets/images/img1.jpg';
import img2 from '../../assets/images/img2.jpg';
import img3 from '../../assets/images/img3.jpg';
import img4 from '../../assets/images/img4.jpg';
import {Image} from 'react-native-elements';
import SliderOptions from './components/SliderOptions';
import SliderShops from './components/SliderShops';
import ScrollNews from './components/ScrollNews';
import {white} from '../../assets/colors';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handle = () => {};

  render() {
    const opt = ['Restaurante', 'Super', 'Departamental', 'Museo', 'Plaza'];

    const shop = [
      {image: img1, name: 'Tienda 1'},
      {image: img2, name: 'Tienda 2'},
      {image: img3, name: 'Tienda 3'},
      {image: img4, name: 'Tienda 4'},
      {image: img1, name: 'Tienda 5'},
      {image: img2, name: 'Tienda 6'},
      {image: img3, name: 'Tienda 7'},
      {image: img4, name: 'Tienda 8'},
    ];
    const news = [
      {
        image: img1,
        title: 'Tienda 1',
        description:
          'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
      },
      {
        image: img2,
        title: 'Tienda 2',
        description:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      },
      {
        image: img3,
        title: 'Tienda 3',
        description:
          'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
      },
      {
        image: img4,
        title: 'Tienda 4',
        description:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      },
      {
        image: img1,
        title: 'Tienda 5',
        description:
          'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
      },
      {
        image: img2,
        title: 'Tienda 6',
        description:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      },
      {
        image: img3,
        title: 'Tienda 7',
        description:
          'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
      },
      {
        image: img4,
        title: 'Tienda 8',
        description:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      },
    ];

    return (
      <ScreenContainer style={{paddingBottom: 0, backgroundColor: white}}>
        <ContainerRow style={styles.cc}>
          <IconButton
            text=""
            name="menuunfold"
            color="#9c9c9c"
            onClickEvent={() => this.props.navigation.navigate('Menu')}
          />
          <Image source={Logo} style={styles.logo} />
        </ContainerRow>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text value="Descubre" style={styles.textLabel} />
          <SliderOptions options={opt} />
          <SliderShops shops={shop} />
          <Text value="Novedades" style={styles.textLabel} />
          <ScrollNews news={news} />
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  cc: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 70,
    height: 70,
    marginStart: 30,
  },
  textLabel: {
    fontSize: 22,
    marginTop: 20,
    marginBottom: 10,
  },
});
