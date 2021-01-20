import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

const CircleRate = props => {
    return (
        <View style={styles.row}>
            <Text style={styles.text}>{props.text}</Text>
            <TouchableOpacity onPress={props.yesSelect}>
              <View style={styles.button}>
                <View style={props.yes ? styles.smallButton : styles.noButton} />
              </View>
              <Text>yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.noSelect}>
              <View style={styles.button}>
                <View style={props.no ? styles.smallButton : styles.noButton} />
              </View>
              <Text>no</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.idkSelect} >
              <View style={styles.button}>
                <View style={props.idk ? styles.smallButton : styles.noButton} />
              </View>
              <Text>idk</Text>
            </TouchableOpacity>
          </View >
    );
}

const styles = StyleSheet.create({
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginBottom:10,
        marginTop:10,
      },
      button: {
        backgroundColor: Colors.grey,
        borderRadius: 100,
        height: 25,
        aspectRatio: 1,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      smallButton: {
        backgroundColor: Colors.darkColor,
        borderRadius: 100,
        height: 15,
        aspectRatio: 1,
      },
      noButton: {

    },
      text: {
        marginLeft: 10,
        flex: 1,
        fontSize: 18,
        fontFamily: 'rubik'
      },
    
});

export default CircleRate;