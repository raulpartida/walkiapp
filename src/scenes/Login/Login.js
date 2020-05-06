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
import {greenDark, white, grayLabel, grayLigth} from '../../assets/colors';
import {baseURL} from '../../Constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      password: '',
      user: '',
    };
  }

  loginHandle = () => {
    const data = new FormData();
    data.append('email', this.state.user);
    data.append('password', this.state.password);

    fetch(baseURL + '/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then(response => response.json())
      .then(response => {
        this.setState({token: response});
        console.log(this.state);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  render() {
    return (
      <ScreenContainer style={styles.parentContainer}>
        <View style={styles.childOne}>
          <Image
            source={require('../../assets/images/walki-logo-temp.jpeg')}
            style={styles.logo}
          />
          <SubTitleSection
            value="Lo quieres, lo tienes..."
            style={styles.label}
          />
        </View>
        <View style={styles.childTwo}>
          <InputField
            hint="Correo"
            handleInputChange={text => this.setState({user: text})}
            inputStyle={styles.input}
            type="email-address"
            isSecure={false}
            keyType="next"
          />
          <InputField
            hint="Contraseña"
            handleInputChange={text => this.setState({password: text})}
            inputStyle={styles.input}
            isSecure={true}
          />
          {/*<NeutralButton
            title="¿Olvidaste tu contraseña?"
            onClickEvent={() => this.props.navigation.push('PasswordRecovery')}
            style={{vis}}
          />
          <SocialIcon
          title="Sign In With Facebook"
          button
          type="facebook"
          style={styles.c}
        />*/}
        </View>
        <ContainerRow style={styles.childThree}>
          <ActionButton
            title="Crear cuenta"
            onClickEvent={() => this.props.navigation.push('SignUp')}
            style={[styles.btnBase, styles.btnSingUp]}
            containerStyle={{flex: 2, paddingStart: 8, paddingEnd: 8}}
          />
          <ActionButton
            title="Iniciar Sesión"
            onClickEvent={() => this.loginHandle()}
            style={[styles.btnBase, styles.btnSignIn]}
            containerStyle={{flex: 3, paddingStart: 8, paddingEnd: 8}}
          />
        </ContainerRow>
      </ScreenContainer>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: white,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  childOne: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 2,
  },
  childTwo: {
    flex: 3,
    alignItems: 'center',
    padding: 20,
  },
  childThree: {flex: 1, alignItems: 'center'},
  logo: {
    width: 100,
    height: 100,
  },
  label: {
    margin: 10,
    fontSize: 16,
    width: '100%',
    color: grayLabel,
    textAlign: 'center',
    flex: 0,
  },
  input: {marginTop: 10, marginBottom: 10},
  btnBase: {
    borderRadius: 10,
    paddingStart: 10,
    paddingEnd: 10,
    paddingBottom: 5,
    paddingTop: 5,
    height: 50,
  },
  btnSingUp: {
    backgroundColor: grayLigth,
    color: white,
  },
  btnSignIn: {
    backgroundColor: greenDark,
    color: white,
  },
});
