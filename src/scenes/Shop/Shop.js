import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import ImageButton from '../../components/ImageButton';
import SubTitleSection from '../../components/SubTitleSection';
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
          <SubTitleSection value="Favoritos" style={styles.c} />
        </ContainerRow>
      </ScreenContainer>
    );
  }
}

export default Shop;

const styles = StyleSheet.create({
  c: {},
});