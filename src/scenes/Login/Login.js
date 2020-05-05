import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import {Image} from 'react-native-elements';
import SubTitleSection from '../../components/SubTitleSection';
import InputField from '../../components/InputField';
import NeutralButton from '../../components/NeutralButton';
import ActionButton from '../../components/ActionButton';
import ContainerRow from '../../components/ContainerRow';
import {SocialIcon} from 'react-native-elements';
import Logo from '../../assets/images/walki-logo-temp.jpeg';
import {green, grayText, white} from '../../assets/colors';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handle = () => {};

  render() {
    return (
      <ScreenContainer style={styles.c}>
        <View style={styles.row1}>
          <Image source={Logo} style={styles.logo} />
          <SubTitleSection
            value="Lo quieres, lo tienes..."
            style={styles.label}
          />
        </View>
        <View style={styles.row2}>
          <InputField
            hint="Usuario"
            handleInputChange={() => this.handle()}
            inputStyle={styles.input}
          />
          <InputField
            hint="Contraseña"
            handleInputChange={() => this.handle()}
            inputStyle={styles.input}
          />
          <NeutralButton
            title="¿Olvidaste tu contraseña?"
            onClickEvent={() => this.props.navigation.push('PasswordRecovery')}
            style={styles.c}
          />
          {/*<SocialIcon
          title="Sign In With Facebook"
          button
          type="facebook"
          style={styles.c}
        />*/}
        </View>
        <ContainerRow style={styles.row3}>
          <ActionButton
            title="Crear cuenta"
            onClickEvent={() => this.props.navigation.push('SignUp')}
            style={(styles.btnBase, styles.btnSignUp)}
            containerStyle={styles.btnSingUpContainer}
          />
          <ActionButton
            title="Iniciar Sesión"
            onClickEvent={() => this.props.navigation.navigate('Home')}
            style={(styles.btnBase, styles.btnSignIn)}
            containerStyle={styles.btnSingInContainer}
          />
        </ContainerRow>
      </ScreenContainer>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  c: {margin: 0},
  row1: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    paddingTop: 50,
  },
  row2: {
    flex: 3,
  },
  row3: {
    position: 'absolute',
    bottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  label: {
    margin: 0,
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  input: {
    width: '70%',
    padding: 8,
  },
  btnBase: {
    fontSize: 16,
    borderRadius: 30,
    paddingStart: 10,
    paddingEnd: 10,
    paddingBottom: 5,
    paddingTop: 5,
    lineHeight: 18,
  },
  btnSingUp: {
    width: '100%',
    backgroundColor: green,
    color: white,
  },
  btnSingUpContainer: {
    width: '36%',
    marginStart: 10,
  },
  btnSignIn: {
    width: '100%',
    backgroundColor: green,
    color: white,
  },
  btnSingInContainer: {
    width: '56%',
  },
});
