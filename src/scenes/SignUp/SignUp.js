import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import {Image} from 'react-native-elements';
import SubTitleSection from '../../components/SubTitleSection';
import InputField from '../../components/InputField';
import SuccessButton from '../../components/SuccessButton';
import ContainerRow from '../../components/ContainerRow';
import ImageButton from '../../components/ImageButton';
import Logo from '../../assets/images/walki-logo-temp.jpeg';
import IconButton from '../../components/IconButton';
import {grayText, green} from '../../assets/colors';
import {SafeAreaView} from 'react-native-safe-area-context';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handle = () => {};

  render() {
    return (
      <ScreenContainer style={{}}>
        <ContainerRow>
          <IconButton
            text=""
            name="arrowleft"
            color="#9c9c9c"
            onClickEvent={() => this.props.navigation.goBack()}
          />
        </ContainerRow>
        <ScrollView>
          <SafeAreaView style={styles.scrollStyle}>
            <View style={styles.rowLogo}>
              <Image source={Logo} style={styles.logo} />
              <SubTitleSection value="Registrate" style={styles.subTitle} />
            </View>
            <InputField
              hint="Nombre"
              label=""
              handleInputChange={() => this.handle()}
              style={styles.input}
            />
            <InputField
              hint="Apellido paterno"
              label=""
              handleInputChange={() => this.handle()}
              style={styles.input}
            />
            <InputField
              hint="Apellido materno"
              label=""
              handleInputChange={() => this.handle()}
              style={styles.input}
            />
            <InputField
              hint="Correo electrónico"
              label=""
              handleInputChange={() => this.handle()}
              style={styles.input}
            />
            <InputField
              hint="Contraseña"
              label=""
              handleInputChange={() => this.handle()}
              style={styles.input}
            />
            <InputField
              hint="Confirmar contraseña"
              label=""
              handleInputChange={() => this.handle()}
              style={styles.input}
            />
            <SuccessButton
              title="Crear cuenta"
              onClickEvent={() => this.handle()}
              style={styles.btn}
            />
          </SafeAreaView>
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default SignUp;

const styles = StyleSheet.create({
  c: {},
  row1: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingStart: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  rowLogo: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  subTitle: {
    letterSpacing: 2,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '600',
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 0,
    padding: 0,
  },
  input: {
    width: '50%',
  },
  scrollStyle: {
    width: '100%',
    padding: 5,
    alignItems: 'center',
  },
  btn: {
    width: '75%',
    borderRadius: 20,
    fontWeight: '400',
    justifyContent: 'center',
  },
});
