import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../../Context';
import ScreenContainer from '../../components/ScreenContainer';
import {Avatar} from 'react-native-elements';
import ImageView from '../../components/ImageView';
import SubTitleSection from '../../components/SubTitleSection';
import CancelButton from '../../components/CancelButton';
import ContainerRow from '../../components/ContainerRow';
import Label from '../../components/Label';
import Text from '../../components/Text';
import IconButton from '../../components/IconButton';
import {graySubTitle, grayText, greenLigth, white} from '../../assets/colors';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handle = () => {};

  render() {
    const {signOut} = React.useContext(AuthContext);
    return (
      <ScreenContainer
        style={{paddingStart: 20, paddingEnd: 20, backgroundColor: white}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          <ContainerRow style={{justifyContent: 'flex-end'}}>
            <IconButton
              text=""
              name="close"
              color="#9c9c9c"
              onClickEvent={() => this.props.navigation.navigate('Home')}
            />
          </ContainerRow>
          <ContainerRow style={styles.avatar}>
            <SubTitleSection value="Raúl Partida" style={styles.person} />
            <Avatar
              rounded
              size="large"
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
          </ContainerRow>
          <View style={styles.container}>
            <SubTitleSection value="Mi cuenta" />
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate('Shop')}>
              <View style={styles.rowSection}>
                <IconButton text="" name="shoppingcart" color="#9c9c9c" />
                <Text value="Tiendas" />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate('Promotion')}>
              <View style={styles.rowSection}>
                <IconButton text="" name="tagso" color="#9c9c9c" />
                <Text value="Ofertas" />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate('Help')}>
              <View style={styles.rowSection}>
                <IconButton text="" name="customerservice" color="#9c9c9c" />
                <Text value="Soporte" />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate('Profile')}>
              <View style={styles.rowSection}>
                <IconButton text="" name="user" color="#9c9c9c" />
                <Text value="Mi perfil" />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate('Configuration')}>
              <View style={styles.rowSection}>
                <IconButton text="" name="setting" color="#9c9c9c" />
                <Text value="Configuración" />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.container}>
            <SubTitleSection value="Información" />
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate('Support')}>
              <View style={styles.rowSection}>
                <IconButton text="" name="exception1" color="#9c9c9c" />
                <Text value="Términos y condiciones" />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate('Join')}>
              <View style={styles.rowSection}>
                <IconButton text="" name="notification" color="#9c9c9c" />
                <Text value="Quiero unirme a Walki" />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <CancelButton
            title="Cerrar sesión"
            style={styles.btnClose}
            onClickEvent={() => signOut()}
          />
          <Label value="0.1.0" style={styles.versionLabel} />
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default Menu;

const styles = StyleSheet.create({
  avatar: {
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingEnd: 10,
  },
  person: {
    color: grayText,
    fontSize: 20,
    fontWeight: '700',
  },
  container: {
    backgroundColor: greenLigth,
    borderRadius: 10,
    overflow: 'hidden',
    width: '97%',
    elevation: 5,
    padding: 15,
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 15,
  },
  rowSection: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  versionLabel: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: 10,
  },
  btnClose: {
    width: '98%',
    paddingBottom: 10,
    paddingTop: 10,
    paddingStart: 20,
    paddingEnd: 20,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
});
