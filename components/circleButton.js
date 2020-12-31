import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const CircleButton = props => {
    return (
      <TouchableOpacity style={{...styles.center, ...styles.circle, ...{borderColor: props.color}}}>
            <Ionicons name={props.icon} size={30} color={props.color} />
            <Text style={{ ...styles.title, ...{ fontSize: 13} }}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    circle: {
        backgroundColor: 'white',
        width: 80,
         height: 80,
        borderRadius: 100,
        padding: 10,
        borderWidth: 2,
      },
      center: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        flex: 1,
        alignItems: 'flex-start',
      },
});

export default CircleButton;