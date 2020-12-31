import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const SafetyCard = props => {
    let color;
    let icon;
    switch (props.result) {
        case 'yes':
            color = Colors.primaryColor;
            icon = 'checkmark';
            break;
        case 'no':
            color = 'red';
            icon = 'close';
            break;
        case 'idk':
            color ='grey';
            icon = 'question';
        default:
            color ='grey';
            icon = 'question'; 
    }
    return (
        <View style={{ ...styles.container, ...{ borderColor: color } }}>
            <View style={styles.row}>
                <Text style={styles.title}>{props.text}</Text>
                <Ionicons name={icon} size={35} color={color} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: 2,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 5,
        fontSize: 20,
    },

});

export default SafetyCard;