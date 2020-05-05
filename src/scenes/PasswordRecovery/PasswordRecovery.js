import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import ImageView from '../../components/ImageView';
import SubTitleSection from '../../components/SubTitleSection';
import InputField from '../../components/InputField';
import Text from '../../components/Text';
import ContainerRow from '../../components/ContainerRow';
import SuccessButton from '../../components/SuccessButton';
import ImageButton from '../../components/ImageButton';

class PasswordRecovery extends Component {
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
            onClickEvent={() => this.props.navigation.goBack()}
          />
        </ContainerRow>
        <ImageView
          style={styles.c}
          url="https://facebook.github.io/react-native/img/tiny_logo.png"
        />
        <SubTitleSection value="Recuperar contraseña" style={styles.c} />
        <Text
          value="Ingresa el código que recibiste para poder cambiar la contraseña"
          style={styles.c}
        />
        <InputField
          hint=""
          handleInputChange={() => this.handle()}
          style={styles.c}
        />
        <SuccessButton
          title="Enviar"
          onClickEvent={() => this.handle()}
          style={styles.c}
        />
      </ScreenContainer>
    );
  }
}

export default PasswordRecovery;

const styles = StyleSheet.create({
  c: {},
});
