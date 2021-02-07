import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Rating } from 'react-native-elements';

const YelpServisRating = props => {
    let image;
    switch (props.rating) {
        case 5:
            image = require('../assets/yelpStars/regular_5.png');
            break;
        case 4.5:
            image = require('../assets/yelpStars/regular_4_half.png');
            break;
        case 4:
            image = require('../assets/yelpStars/regular_4.png');
            break;
        case 3.5:
            image = require('../assets/yelpStars/regular_3_half.png');
            break;
        case 3:
            image = require('../assets/yelpStars/regular_3.png');
            break;
        case 2.5:
            image = require('../assets/yelpStars/regular_2_half.png');
            break;
        case 2:
            image = require('../assets/yelpStars/regular_2.png');
            break;
        case 1.5:
            image = require('../assets/yelpStars/regular_1_half.png');
            break;
        case 1:
            image = require('../assets/yelpStars/regular_1.png');
            break;
        case 0:
            image = require('../assets/yelpStars/regular_0.png');
            break;
        default:
            image = require('../assets/yelpStars/yelpLogo.png');

    }

    return (
        <TouchableOpacity onPress={props.onSelect}>
            <View style={styles.center} >
                <View style={[styles.row, styles.center, styles.container]}>
                    <View style={{ flex: 1 }}>
                        <Image style={styles.image} source={require('../assets/yelpStars/yelpLogo.png')} />
                        
                    </View>
                    <View style={{ flex: 1 }}>
                        <Image style={styles.imageRating} source={image} />

                    </View>
                </View>
            </View>

            <View style={{...styles.row,...{marginLeft:30,marginRight:20, marginBottom:20, marginTop:5}}}>
                <Text style={styles.smallText}>See more...</Text>
                <Text style={styles.title}>{props.reviewCount} reviews</Text>
            </View>

        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        backgroundColor: 'white',
        width: '90%',
        height: 70,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        paddingLeft: 10,
        paddingRight: 10,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        alignItems: 'flex-end',
        fontSize: 15,
    },
    imageRating: {
        marginRight: 20,
        width: 145,
        height: 25,
    },
    image: {
        marginLeft: 20,
        width: 70,
        height: 35
    }
});

export default YelpServisRating;