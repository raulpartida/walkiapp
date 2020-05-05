import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import ImageView from '../../components/ImageView';
import SubTitleSection from '../../components/SubTitleSection';
import InputField from '../../components/InputField';
import SuccessButton from '../../components/SuccessButton';
import ContainerRow from '../../components/ContainerRow';
import ImageButton from '../../components/ImageButton';

class NewPassword extends Component {
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
        <ImageView
          style={styles.c}
          url="https://facebook.github.io/react-native/img/tiny_logo.png"
        />
        <SubTitleSection value="Nueva contraseña" style={styles.c} />
        <InputField
          hint="Nueva contraseña"
          handleInputChange={() => this.handle()}
          style={styles.c}
        />
        <InputField
          hint="Confirmar contraseña"
          handleInputChange={() => this.handle()}
          style={styles.c}
        />
        <SuccessButton
          title="Crear cuenta"
          onClickEvent={() => this.handle()}
          style={styles.c}
        />
      </ScreenContainer>
    );
  }
}

export default NewPassword;

const styles = StyleSheet.create({
  c: {},
});
