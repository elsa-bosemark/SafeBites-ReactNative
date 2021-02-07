import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';




const TabSlider = props => {
    if (props.active === true) {
        // if (props.favactive == true) {
        //     props.comactive = false;
        // } else if (props.comactive == true) {
        //     props.favactive = false;
        // }
        return (
            <TouchableOpacity style={{ ...styles.container, ...{ backgroundColor: "white" } }} onPress={props.onSelect}>
                <Ionicons name={props.icon} size={15} color={props.activeIconColor} />
                <Text>  {props.title}</Text>
                <View style={styles.activeSlider} />
            </TouchableOpacity>
        )

    } else if (props.active == false) {
        return (
            <TouchableOpacity style={{ ...styles.container, ...{ backgroundColor: "#E0E0E0" } }} onPress={props.onSelect}>
                <Ionicons name={props.icon} size={15} color="#545454" />
                <Text>  {props.title}</Text>
            </TouchableOpacity>
        )
    } else {
        //show an alert
        return
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        borderRadius: 5,
        margin:10,
        width:"48%",
        justifyContent:"center",
        alignItems:"center"
    }
});

export default TabSlider;