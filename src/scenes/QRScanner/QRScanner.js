import React, {Component} from 'react';
import {PermissionsAndroid, View} from 'react-native';
import {
  Platform, 
  ToolbarAndroid, 
  Text, 
  Linking, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import ImageButton from '../../components/ImageButton';
import SubTitleSection from '../../components/SubTitleSection';
import {SocialIcon} from 'react-native-elements';
import {Tile} from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import {green} from '../../assets/colors';

class QRScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  barcodeRecognized = ({ barcodes }) => {
    barcodes.forEach(barcode => console.warn(barcode.data))
  };

  handle = () => {};

  render() {
    return (
      <ScreenContainer style={styles.c}>

          <RNCamera
            ref={ref => {this.camera = ref;}}
            style={styles.camera}
            onGoogleVisionBarcodesDetected={this.barcodeRecognized}
          >
          </RNCamera>
       
      </ScreenContainer>
    );
  }
}

export default QRScanner;

var styles = StyleSheet.create({
  c: {
    padding: 0,
    height: '100%',
    borderWidth: 1
  },
  camera: {
    width: '100%',
    flex: 1
  }
});
