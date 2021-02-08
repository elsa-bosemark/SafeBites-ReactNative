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
    width:'70%',
    borderRadius: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});

export default DefaultButton;