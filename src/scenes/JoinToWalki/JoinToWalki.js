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

class JoinToWalki extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handle = () => {};

  render() {
    return <ScreenContainer style={styles.c}></ScreenContainer>;
  }
}

export default JoinToWalki;

const styles = StyleSheet.create({
  c: {},
});
