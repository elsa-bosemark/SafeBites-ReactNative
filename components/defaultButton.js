import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';


const DefaultButton = props => {
  return (
    <TouchableOpacity style={{ ...styles.button, ...{ backgroundColor: props.buttonColor } }} onPress={props.onSelect}>
      <Text style={{ ...styles.buttonText, ...{ color: props.textColor } }}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'rubik-bold',
    fontSize: 20,
  },
});

export default DefaultButton;