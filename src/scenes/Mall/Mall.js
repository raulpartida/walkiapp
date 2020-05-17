import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, Image} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SubTitleSection from '../../components/SubTitleSection';
import ActionButton from '../../components/ActionButton';
import IconButton from '../../components/IconButton';
import ContainerRow from '../../components/ContainerRow';
import NeutralButton from '../../components/NeutralButton';
import photo from '../../assets/images/profile.jpg';
import {
  grayText,
  grayLigth,
  grayLabel,
  white,
  red,
  yellow,
  green,
  greenLigth,
  greenDark,
} from '../../assets/colors';

class Mall extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handle = () => {};

  render() {
    return (
      <ScreenContainer style={{padding: 0, backgroundColor: white}}>
        <ScrollView>
          <View style={styles.bodyContainer}>
            <ContainerRow style={{marginBottom: 30}}>
              <IconButton
                text=""
                name="arrowleft"
                color="#9c9c9c"
                onClickEvent={() => this.props.navigation.goBack()}
              />
              <Text style={styles.label}>Oferta Walki</Text>
            </ContainerRow>
            <Image style={styles.imagePromotion} source={photo} />
            <SubTitleSection style={styles.title} value="Rayal Pretish" />
            <Text>Nasdasd fwefwe we wefwefwef ewfwefwef wefwef wef</Text>
            <Text> Términos y condiciones</Text>
          </View>
          <View style={styles.footerContainer}>
            <ActionButton
              title="Redimir"
              style={styles.btn}
              onClickEvent={() => this.handle()}
            />
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default Mall;

const styles = StyleSheet.create({
  bodyContainer: {
    borderRadius: 20,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: white,
  },
  footerContainer: {
    backgroundColor: green,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imagePromotion: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  label: {
    backgroundColor: yellow,
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: '300',
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    lineHeight: 25,
    width: '100%',
    textAlign: 'center',
  },
  btn: {
    width: '80%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
    marginTop: 30,
    backgroundColor: greenDark,
  },
});