import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import {Image} from 'react-native-elements';
import Logo from '../../assets/images/walki-logo-temp.jpeg';
import {white} from '../../assets/colors';

class CodeRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <ScreenContainer style={styles.parentContainer}>
        <Image source={Logo} style={styles.logo} />
      </ScreenContainer>
    );
  }
}

export default CodeRecovery;

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
});
