import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SubTitleSection from '../../components/SubTitleSection';
import Text from '../../components/Text';
import InputField from '../../components/InputField';
import ContainerRow from '../../components/ContainerRow';
import ImageView from '../../components/ImageView';
import ActionButton from '../../components/ActionButton';
import ImageButton from '../../components/ImageButton';

class CodeRecovery extends Component {
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
        <SubTitleSection style={styles.c} value="Ingresa el código" />
        <Text
          style={styles.c}
          value="Nasd asd asdasd ddadad asdasd adasda asd asda sd asd"
        />
        <ContainerRow style={styles.c}>
          <InputField style={styles.c} />
          <InputField style={styles.c} />
          <InputField style={styles.c} />
          <InputField style={styles.c} />
          <InputField style={styles.c} />
        </ContainerRow>
        <ActionButton
          onClickEvent={() => this.handle()}
          title="Enviar"
          style={styles.c}
        />
      </ScreenContainer>
    );
  }
}

export default CodeRecovery;

const styles = StyleSheet.create({
  c: {},
});
