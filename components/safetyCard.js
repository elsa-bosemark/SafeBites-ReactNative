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
        <View>
            <View style={{ ...styles.container, ...{ borderColor: color } }}>
                <View style={{ ...styles.row, ...{ justifyContent: 'space-between', } }}>
                    <View>
                        <Text style={{ ...styles.title, ...{ fontSize: 13 } }}>{props.text}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-start', justifyContent: "flex-start", paddingRight: 5 }}>
                        <Ionicons name={icon} size={30} color={color} style={style} />
                    </View>
                </View>
                <View style={{ ...styles.row, ...{ paddingTop: 2, alignItems: "flex-end", justifyContent: "flex-start" } }}>
                    {/* <Ionicons name='person' size={20} color='grey' /> */}
                    <Text style={{ fontSize: 12 }}>{props.reviewCount}</Text>
                    <Text style={{ fontSize: 12 }}> reviews</Text>
                </View>

            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: 2,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10,
        marginBottom: 5,
        width: 180,

    },
    row: {
        flexDirection: 'row',
    },
    title: {
        width: 140
    },

});

export default SafetyCard;