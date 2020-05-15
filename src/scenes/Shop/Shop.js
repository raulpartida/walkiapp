import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import ImageView from '../../components/ImageView';
import SubTitleSection from '../../components/SubTitleSection';
import Text from '../../components/Text';
import Label from '../../components/Label';
import ImageButton from '../../components/ImageButton';
import ContainerRow from '../../components/ContainerRow';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handle = () => {};

  render() {
    return (
      <ScreenContainer style={styles.c}>
        <ContainerRow style={styles.c}>
          <ImageButton
            style={styles.c}
            url=""
            onClickEvent={() => this.prop.navigation.goBack()}
          />
        </ContainerRow>
        <View style={styles.c}>
          <SubTitleSection value="Lo quieres, lo tienes..." style={styles.c} />
          <View style={styles.c}>
            <Text value="raul.partida@gmail.com" style={styles.c} />
            <Label value="Correo electrónico" style={styles.c} />
          </View>
          <View style={styles.c}>
            <Text value="33 3333 6666" style={styles.c} />
            <Label value="Teléfono" style={styles.c} />
          </View>
          <View style={styles.c}>
            <Text value="20 Junio 1994" style={styles.c} />
            <Label value="Fecha nacimiento" style={styles.c} />
          </View>
          <ContainerRow style={styles.c}>
            <Text value="Cambiar contraseña" style={styles.c} />
          </ContainerRow>
          <ContainerRow style={styles.c}>
            <Text value="Deshabilitar cuenta" style={styles.c} />
          </ContainerRow>
        </View>
      </ScreenContainer>
    );
  }
}

export default Shop;

var styles = StyleSheet.create({});
