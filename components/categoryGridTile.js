import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, TouchableNativeFeedback } from 'react-native';
import { endAsyncEvent } from 'react-native/Libraries/Performance/Systrace';
//import Image from 'react-native-remote-svg'

const CategoryGridTile = props => {
    //if on andoid and has ripple effect then use that (looks better)
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Plateform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.gridItem}>
            <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
                <View style={styles.container}>
                    <Text style={styles.text}>{props.title}</Text>
                    <Image
                        style={styles.image}
                        source={props.icon}
                    />
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
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontFamily: 'rubik',
        fontSize: 18,
        paddingBottom: 10,
    }
});

export default CategoryGridTile;