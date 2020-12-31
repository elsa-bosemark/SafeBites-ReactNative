import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';

const ServisRating = props => {
    return (
        <TouchableOpacity onPress={props.onSelect}>
            <View style={styles.center} >
                <View style={[styles.row, styles.center, styles.container]}>
                    <Text style={styles.title}>{props.text}</Text>
                    <Rating style={styles.rating}
                        imageSize={24}
                        type='custom'
                        ratingColor='#FFB547'
                        readonly={true}
                        startingValue={props.rating} />
                </View>
            </View>

            <View style={{ flex: 1, alignItems: 'flex-end', }}>
                <Text style={styles.smallText}>See more...</Text>
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
        height: 60,
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
        marginLeft: 10,
        flex: 1,
        alignItems: 'flex-start',
        fontSize: 20,
    },
    rating: {
        marginRight: 10,
    },
    smallText: {
        marginBottom: 20,
        marginRight: 20,
        fontFamily: 'rubik-light'
    }
});

export default ServisRating;