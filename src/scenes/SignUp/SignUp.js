import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import {Image} from 'react-native-elements';
import SubTitleSection from '../../components/SubTitleSection';
import InputField from '../../components/InputField';
import SuccessButton from '../../components/SuccessButton';
import ErrorLabel from '../../components/ErrorLabel';
import ContainerRow from '../../components/ContainerRow';
import Logo from '../../assets/images/walki-logo-temp.jpeg';
import IconButton from '../../components/IconButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {baseURL} from '../../Constants';
import Toast from 'react-native-simple-toast';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {
        name: {
          type: "generic",
          value: "",
          errorLabel: false 
        },
        last: {
          type: "generic",
          value: "",
          errorLabel: false
        },
        email: {
          type: "email",
          value: "",
          errorLabel: false
        },
        password: {
          type: "password",
          value: "",
          errorLabel: false
        },
        password2: {
          type: "repeatPassword",
          value: "",
          errorLabel: false
        }
      }
    };
  }


  handle = (text, input) => {
    this.setState(prevState => {
      let inputs = { ...prevState.inputs };
      inputs[input]['value'] = text;          
      inputs[input]['errorLabel'] = false;          
      return { inputs };
    })
  }
  
  createAccount = () => {
    const { inputs } = this.state;

    if(!this.verifyFields()){
      fetch(baseURL + '/user/registerUsers', {
        method: 'POST',
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inputs.name.value,
            last: inputs.last.value,
            email: inputs.email.value,
            password: inputs.password.value,
            address: '',
            role: 'USER',
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.ok){
          Toast.show("Usuario registrado exitosamente.");
          this.props.navigation.goBack()
        }else{
          if(responseJson.message == 'User already exist'){
            Toast.show("Ya existe un usuario con este email.");
          }else{
            Toast.show("Ocurrió un error. Inténtalo más tarde.");
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }
  
  verifyFields(){
    const { inputs } = this.state;
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regPass = /^.{6,}$/;
    const errorLabels = {
      generic: "Campo requerido.",
      email: "Email no válido.",
      password: "Mínimo 6 caracteres.",
      repeatPassword: "Las contraseñas no coinciden"
    };

    let error = false;
    let errorCurrentField = false;

    for (const [key, input] of Object.entries(inputs)) {
      
      if(input.value == '' && input.type != 'repeatPassword'){
        error = true;
        errorCurrentField = true;
      }else{
        if(input.type == 'email'){
          if (regEmail.test(input.value) === false) {
            error = true;
            errorCurrentField = true;
          }
        }else if(input.type == 'password'){
          if (regPass.test(input.value) === false) {
            error = true;
            errorCurrentField = true;
          }
        }else if(input.type == 'repeatPassword' && inputs.password.value != ''){
          if (input.value !== inputs.password.value) {
            error = true;
            errorCurrentField = true;
          }
        }
      }

      if(errorCurrentField){
        errorCurrentField = false;

        this.setState(prevState => {
          let inputs = { ...prevState.inputs };
          inputs[key]['errorLabel'] = errorLabels[input.type];               
          return { inputs };
        })
      }else{
        this.setState(prevState => {
          let inputs = { ...prevState.inputs };
          inputs[key]['errorLabel'] = false;                 
          return { inputs };
        })
      }
    };

    return error;
  }

  renderError(id) {
    const { inputs } = this.state;
    if (inputs[id].errorLabel != false) {
      return <ErrorLabel style={styles.error} value={inputs[id].errorLabel}></ErrorLabel>;
    }
    return null;
  }

  render() {
    return (
      <ScreenContainer style={styles.bg}>
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
              handleInputChange={(text) => this.handle(text, 'name')}
              style={styles.input}
            />
            {this.renderError("name")}

            <InputField
              hint="Apellidos"
              label=""
              handleInputChange={(text) => this.handle(text, 'last')}
              style={styles.input}
            />
            {this.renderError("last")}

            <InputField
              hint="Correo electrónico"
              label=""
              handleInputChange={(text) => this.handle(text, 'email')}
              style={styles.input}
            />
            {this.renderError("email")}

            <InputField
              hint="Contraseña"
              label=""
              isSecure={true}
              handleInputChange={(text) => this.handle(text, 'password')}
              style={styles.input}
            />
            {this.renderError("password")}

            <InputField
              hint="Confirmar contraseña"
              label=""
              isSecure={true}
              handleInputChange={(text) => this.handle(text, 'password2')}
              style={styles.input}
            />
            {this.renderError("password2")}

            <SuccessButton
              title="Crear cuenta"
              onClickEvent={() => this.createAccount()}
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
  bg: {
    backgroundColor: 'white'
  },
  row1: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingStart: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  rowLogo: {
    marginTop: 30,
    marginBottom: 10,
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
    width: 200,
    borderRadius: 30,
    marginTop: 20
  },
  error: {
    marginTop: -5,
    marginBottom: 10
  }
});
