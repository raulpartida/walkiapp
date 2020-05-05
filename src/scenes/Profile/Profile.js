import React, {Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SubTitleSection from '../../components/SubTitleSection';
import Text from '../../components/Text';
import Label from '../../components/Label';
import IconButton from '../../components/IconButton';
import ContainerRow from '../../components/ContainerRow';
import photo from '../../assets/images/profile.jpg';
import {grayText, grayLigth, grayLabel, white, red} from '../../assets/colors';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handle = () => {};

  render() {
    return (
      <ScreenContainer style={styles.gnrlContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ContainerRow>
            <IconButton
              text=""
              name="arrowleft"
              color="#9c9c9c"
              onClickEvent={() => this.props.navigation.goBack()}
            />
            <IconButton
              text=""
              name="edit"
              color="#9c9c9c"
              onClickEvent={() => this.props.navigation.push('EditProfile')}
            />
          </ContainerRow>
          <Image source={photo} style={styles.photoProfile} />
          <View style={styles.container}>
            <Text value="Raúl Partida I." style={styles.titleProfile} />
            <View style={styles.rowField}>
              <Label value="Correo electrónico" style={styles.labelField} />
              <Text value="raul.partida@gmail.com" style={styles.field} />
            </View>
            <View style={styles.rowField}>
              <Label value="Teléfono" style={styles.labelField} />
              <Text value="33 3333 6666" style={styles.field} />
            </View>
            <View style={styles.rowField}>
              <Label value="Fecha nacimiento" style={styles.labelField} />
              <Text value="20 Junio 1994" style={styles.field} />
            </View>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.push('NewPassword')}>
              <View>
                <ContainerRow style={styles.rowField}>
                  <Text
                    value="Cambiar contraseña"
                    style={{color: red, fontSize: 16}}
                  />
                  <IconButton text="" name="right" color={red} />
                </ContainerRow>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View>
                <ContainerRow style={styles.rowField}>
                  <Text
                    value="Deshabilitar cuenta"
                    style={{color: red, fontSize: 16}}
                  />
                  <IconButton text="" name="right" color={red} />
                </ContainerRow>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default Profile;

var styles = StyleSheet.create({
  gnrlContainer: {
    padding: 0,
    backgroundColor: grayLigth,
  },
  photoProfile: {
    width: '100%',
    maxHeight: '30%',
    height: 200,
  },
  container: {
    width: '100%',
    maxHeight: '70%',
    height: '100%',
    backgroundColor: grayLigth,
  },
  titleProfile: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: white,
    fontSize: 22,
    lineHeight: 25,
    marginBottom: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  labelField: {
    margin: 0,
    padding: 0,
    width: '100%',
    fontSize: 14,
    lineHeight: 20,
    color: grayLabel,
    alignItems: 'center',
  },
  field: {
    margin: 0,
    padding: 0,
    width: '100%',
    fontSize: 18,
    lineHeight: 20,
    color: grayText,
  },
  rowField: {
    paddingEnd: 20,
    paddingStart: 20,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: white,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    marginStart: 0,
    marginEnd: 0,
  },
});
