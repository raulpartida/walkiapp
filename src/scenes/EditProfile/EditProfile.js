import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {Avatar} from 'react-native-elements';
import ScreenContainer from '../../components/ScreenContainer';
import ImageButton from '../../components/ImageButton';
import InputField from '../../components/InputField';
import NeutralButton from '../../components/NeutralButton';
import ContainerRow from '../../components/ContainerRow';
import Label from '../../components/Label';
import {grayText, grayLigth, grayLabel, white, red} from '../../assets/colors';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  _updateUserInfo = async (user, token) => {
    try {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
      headers.get('Content-Type');

      let response = await fetch(baseURL + '/user', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(user),
      })
        .then(response => {
          return response.json();
        })
        .catch(error => {
          console.error('Exception:', error);
          return {};
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ScreenContainer style={styles.gnrlContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ContainerRow>
            <NeutralButton
              title="Cancelar"
              onClickEvent={() => this.props.navigation.goBack()}
            />
            <NeutralButton title="Guardar" onClickEvent={() => this.handle()} />
          </ContainerRow>
          <ContainerRow style={{justifyContent: 'center'}}>
            <Avatar
              size="xlarge"
              iconStyle={{size: 30}}
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
              showEditButton
            />
          </ContainerRow>
          <View style={styles.rowField}>
            <Label value="Nombre" style={styles.labelField} />
            <InputField hint="" handleInputChange={() => this.handle()} />
          </View>
          <View style={styles.rowField}>
            <Label value="Apellido Paterno" style={styles.labelField} />
            <InputField hint="" handleInputChange={() => this.handle()} />
          </View>
          <View style={styles.rowField}>
            <Label value="Apellido Paterno" style={styles.labelField} />
            <InputField hint="" handleInputChange={() => this.handle()} />
          </View>
          <View style={styles.rowField}>
            <Label value="Correo electrónico" style={styles.labelField} />
            <InputField
              hint=""
              label="Correo electrónico"
              handleInputChange={() => this.handle()}
            />
          </View>
          <View style={styles.rowField}>
            <Label value="Teléfono" style={styles.labelField} />
            <InputField
              hint=""
              label="Teléfono"
              handleInputChange={() => this.handle()}
            />
          </View>
          <View style={styles.rowField}>
            <Label value="Fecha de nacimiento" style={styles.labelField} />
            <InputField
              hint=""
              label="Fecha de nacimiento"
              handleInputChange={() => this.handle()}
            />
          </View>
          <View style={styles.rowField}>
            <Label value="Sexo" style={styles.labelField} />
            <ContainerRow style={styles.sexContainer}>
              <NeutralButton
                onClickEvent={() => this.handle()}
                title="Masculino"
                style={styles.btnSex}
              />
              <NeutralButton
                onClickEvent={() => this.handle()}
                title="Femenino"
                style={styles.btnSex}
              />
            </ContainerRow>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default EditProfile;

const styles = StyleSheet.create({
  gnrlContainer: {
    justifyContent: 'center',
    backgroundColor: white,
  },
  rowField: {
    paddingEnd: 10,
    paddingStart: 10,
    backgroundColor: white,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    marginStart: 0,
    marginEnd: 0,
  },
  sexContainer: {
    backgroundColor: grayLigth,
    borderRadius: 10,
    height: 50,
    padding: 5,
  },
  btnSex: {
    flex: 1,
    backgroundColor: white,
    borderRadius: 10,
    height: 40,
    paddingStart: 30,
    paddingEnd: 30,
  },
});
