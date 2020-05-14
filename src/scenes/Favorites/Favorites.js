import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import ImageButton from '../../components/ImageButton';
import IconButton from '../../components/IconButton';
import SubTitleSection from '../../components/SubTitleSection';
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
      <ScreenContainer style={styles.c}>
        <ContainerRow style={styles.c}>
          <IconButton
            style={styles.c}
            color="#9c9c9c"
            name="arrowLeft"
            onClickEvent={() => this.props.navigation.goBack()}
          />
          <SubTitleSection value="Favoritos" style={styles.c} />
        </ContainerRow>
      </ScreenContainer>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  c: {},
});
