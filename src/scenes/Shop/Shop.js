import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import ImageView from '../../components/ImageView';
import SubTitleSection from '../../components/SubTitleSection';
import Text from '../../components/Text';
import Label from '../../components/Label';
import ImageButton from '../../components/ImageButton';
import ContainerRow from '../../components/ContainerRow';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handle = () => {};

  render() {
    return (
      <ScreenContainer style={style.c}>
        <ContainerRow style={style.c}>
          <ImageButton
            style={styles.c}
            url=""
            onClickEvent={() => this.prop.navigation.goBack()}
          />
        </ContainerRow>
        <View style={styles.c}>
          <SubTitleSection value="Lo quieres, lo tienes..." style={style.c} />
          <View style={styles.c}>
            <Text value="raul.partida@gmail.com" style={style.c} />
            <Label value="Correo electrónico" style={style.c} />
          </View>
          <View style={styles.c}>
            <Text value="33 3333 6666" style={style.c} />
            <Label value="Teléfono" style={style.c} />
          </View>
          <View style={styles.c}>
            <Text value="20 Junio 1994" style={style.c} />
            <Label value="Fecha nacimiento" style={style.c} />
          </View>
          <ContainerRow style={styles.c}>
            <Text value="Cambiar contraseña" style={style.c} />
          </ContainerRow>
          <ContainerRow style={styles.c}>
            <Text value="Deshabilitar cuenta" style={style.c} />
          </ContainerRow>
        </View>
      </ScreenContainer>
    );
  }
}

export default Login;

var styles = StyleSheet.create({
  c: {},
});
