import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, TouchableNativeFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDistance } from 'geolib';

import CatIcon from './catIcon';
//import TransactionDeliveryIcon from './catIcon';
import Colors from '../constants/Colors';

const RestaurantCard = props => {
    //if on andoid and has ripple effect then use that (looks better)
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Plateform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    // const catDelivery = props.transactions.forEach(function (item) {
    //     if (item === 'delivery') {
    //         console.log('there is delivery')
    //         return true;
    //     }
    // });
    //const userCoor = props.userCoordinates;
    const restaurantDistance = getDistance(
        props.userCoordinates,
        props.restaurantCoordinates
    );

    console.log('rest coordinates'+ Number((restaurantDistance/1000).toFixed(1)))

    return (
        <View style={styles.gridItem}>
            <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Image style={styles.image} source={{ uri: props.cover }} />

                        <View>
                            <View>
                                {/* the three categories */}

                                {/* <View style={styles.row}>
                                    <CatIcon category={props.curbsidePickup} />
                                    <Text style={[styles.text, styles.smallText]}>Curbside Pickup</Text>
                                </View>

                                <View style={styles.row}>
                                    <CatIcon category={props.takeout} />
                                    <Text style={[styles.text, styles.smallText]}>Takeout</Text>

                                </View>

                                <View style={styles.row}>
                                    <CatIcon cat={props.transactions} />
                                    <Text style={[styles.text, styles.smallText]}>Delivery</Text>
                                </View> */}

                                <CatIcon cat={props.transactions} />
                                <View style={styles.row}>
                                    <View style={styles.tag}>
                                        <Text style={[styles.text, styles.mediumText, styles.whiteText]}>{props.price}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Ionicons style={styles.icon} name='md-location-sharp' size={35} color={Colors.accentColor} />
                                        <Text style={[styles.text, styles.largeText]}>{Number((restaurantDistance/1000).toFixed(1))} km</Text>
                                    </View>

                                </View>

                            </View>

                        </View>

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
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        // for IOS
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        // for android
        elevation: 3,

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
        height: '95%',
        marginRight: 10,
        borderRadius: 10,
        alignItems: 'flex-start'

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //flex:1,
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

    },
    whiteText: {
        color: 'white',
    },
    icon: {
        paddingBottom: 5,
    }

});

export default RestaurantCard;