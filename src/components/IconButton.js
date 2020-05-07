import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

export default props => {
  return (
    <Icon.Button
      name={props.name}
      onPress={props.onClickEvent}
      backgroundColor="red"
      size={20}
      style={{borderColor: 'red', position: 'relative'}}
      color={props.color}>
      {props.text}
    </Icon.Button>
  );
};
