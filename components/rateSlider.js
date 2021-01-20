import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Slider } from 'react-native-elements';

import Colors from '../constants/Colors';



const RateSlider = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.text}</Text>
            <View style={styles.slider}>
                <Slider
                    value={props.value}
                    thumbStyle={styles.sliderThumb}
                    trackStyle={styles.sliderTrack}
                    disabled={false}
                    minimumTrackTintColor={Colors.primaryColor}
                    maximumTrackTintColor={Colors.grey}
                    maximumValue={props.maxVal}
                    onValueChange={props.onValueChange}
                    step={props.step}
                    style={{ flex: 1 }}
                />
                <Text style={{
                    alignItems: 'flex-start',
                    paddingTop: 5,
                    marginLeft: 5,
                    fontSize: 20,
                    width: 51
                }}>{props.value}%</Text>
            </View>
            <View style={styles.row}>
                <Text>Disagree</Text>
                <Text>Agree</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom:10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    slider: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    sliderThumb: {
        height: 30,
        width: 30,
        backgroundColor: Colors.darkGrey,
    },
    sliderTrack: {
        height: 20,
        borderRadius: 20,
    },
    title: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom:5,
    }
});

export default RateSlider;