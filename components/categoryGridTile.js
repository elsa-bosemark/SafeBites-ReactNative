import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, Dimensions, TouchableNativeFeedback } from 'react-native';
import { endAsyncEvent } from 'react-native/Libraries/Performance/Systrace';
//import Image from 'react-native-remote-svg'
const screen = Dimensions.get('window'); //screen dimensions

const CategoryGridTile = props => {
    //if on andoid and has ripple effect then use that (looks better)
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.gridItem}>
            <TouchableCmp style={styles.container} onPress={props.onSelect}>
                <Text style={styles.text}>{props.title}</Text>
                <Image
                    style={styles.image}
                    source={props.icon}
                />
            </TouchableCmp>
        </View>

    )
}
const styles = StyleSheet.create({

    gridItem: {
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    container: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
        // for IOS
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        // for android
        elevation: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // width: screen.width * 0.4,
        aspectRatio: 1.4,
        alignSelf: 'center',
        height: 100,
    },
    image: {
        marginTop: 5,
    },
    text: {
        fontFamily: 'rubik',
        fontSize: 18,
        paddingBottom: 5,
        paddingTop: 0,
        marginTop: 0
    }
});

export default CategoryGridTile;