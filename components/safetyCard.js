import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const SafetyCard = props => {
    let color;
    let icon;
    let style;
    switch (props.result) {
        case 'yes':
            color = Colors.primaryColor;
            icon = 'checkmark';
            style = {
                marginTop: 10
            }
            break;
        case 'no':
            color = 'red';
            icon = 'close';
            style = {
                marginTop: 10
            }
            break;
        case 'idk':
            color = 'grey';
            icon = 'question';
        default:
            color = 'grey';
            icon = 'question';
    }

    return (
        <View style={{ ...styles.container, ...{ borderColor: color } }}>
            <View style={styles.row}>
                <View>
                    <Text style={styles.title}>{props.text}</Text>
                    <View style={{ ...styles.row, ...{ paddingTop: 5 } }}>
                        <Ionicons name='person' size={20} color='grey' />
                        <Text style={styles.title}>{props.reviewCount}</Text>
                    </View>

                </View>
                <View style={{ felx: 2, alignItems: 'center' }}>
                    <Ionicons name={icon} size={35} color={color} style={style} />
                </View>



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
        paddingLeft: 5,
        marginRight: 10,
        fontSize: 18,
    },

});

export default SafetyCard;