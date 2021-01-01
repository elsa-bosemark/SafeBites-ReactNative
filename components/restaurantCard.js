import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, TouchableNativeFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDistance } from 'geolib';

import CatIcon from './catIcon';
import Colors from '../constants/Colors';
import SafetyScore from '../components/handSanatizer';


const RestaurantCard = props => {
    //if on andoid and has ripple effect then use that (looks better)
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    const restaurantDistance = getDistance(
        props.userCoordinates,
        props.restaurantCoordinates
    );

    return (
        <View style={styles.gridItem}>
            <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
                <View style={styles.container}>
                    <View style={styles.row}>
                        {/* Image */}
                        <Image style={styles.image} source={{ uri: props.cover }} />

                        {/* Info */}
                        <View style={{ flex: 1 }}>
                            <View style={{ ...styles.row, ...{ flex: 1, alignItems: 'center' } }}>
                                <View style={styles.tag}>
                                    <Text style={[styles.text, styles.mediumText, styles.whiteText]}>{props.price}</Text>
                                </View>
                                <View style={{ ...styles.row, ...{ alignItems: 'center' } }}>
                                    <Ionicons style={styles.icon} name='md-location-sharp' size={35} color={Colors.accentColor} />
                                    <Text style={[styles.text, styles.largeText]}>{Number((restaurantDistance / 1000).toFixed(1))} km</Text>
                                </View>
                            </View>
                            <CatIcon style={{ alignItem: 'flex-end', margin: 20 }} cat={props.transactions} />
                        </View >

                        {/* Hand Sanatizer */}
                        <SafetyScore style={{ flex: 1 }} score={8} size={1}/>
                    </View>

                    <Text style={[styles.text, styles.title]}>{props.title}</Text>

                </View>
            </TouchableCmp>
        </View>

    )
}
const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    container: {
        width: '100%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
    },
    text: {
        fontFamily: 'rubik',
    },
    title: {
        flex: 1,
        alignItems: 'flex-start',
        paddingTop: 10,
        fontSize: 20,
    },
    image: {
        flex: 1,
        width: '40%',
        height: 150,
        marginRight: 10,
        borderRadius: 10,
        alignItems: 'flex-start'
    },
    row: {
        flexDirection: 'row',
    },
    smallText: {
        fontSize: 15,
    },
    mediumText: {
        fontSize: 19,
    },
    largeText: {
        fontSize: 20,
    },
    tag: {
        padding: 10,
        backgroundColor: Colors.accentColor,
        borderRadius: 5,
        height: 40,

    },
    whiteText: {
        color: 'white',
    },
    icon: {
        paddingBottom: 5,
    }

});

export default RestaurantCard;