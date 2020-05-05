import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import ImageView from '../../components/ImageView';

class CodeRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <ScreenContainer style={styles.c}>
        <ImageView
          style={styles.c}
          url="https://facebook.github.io/react-native/img/tiny_logo.png"
        />
      </ScreenContainer>
    );
  }
}

export default CodeRecovery;

const styles = StyleSheet.create({
  c: {},
});
