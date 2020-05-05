import React, {Component} from 'react';
import {Platform, ToolbarAndroid, StyleSheet} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import ImageView from '../../components/ImageView';
import SubTitleSection from '../../components/SubTitleSection';
import InputField from '../../components/InputField';
import NeutralButton from '../../components/NeutralButton';
import ActionButton from '../../components/ActionButton';
import ContainerRow from '../../components/ContainerRow';
import {SocialIcon} from 'react-native-elements';
import {Tile} from 'react-native-elements';
import ImageButton from '../../components/ImageButton';

class QRScanner extends Component {
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
      </ScreenContainer>
    );
  }
}

export default QRScanner;

var styles = StyleSheet.create({
  c: {},
});
