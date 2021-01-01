
import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';

const SafetyScore = props => {
    return (
        <View>
            <ImageBackground style={{ ...styles.image, ...{ width: 80 * props.size, height: 150 * props.size } }} source={require('../assets/handSanatizer.png')}>
                <Text style={{ ...styles.text, ...{fontSize: props.size * 20,paddingBottom: props.size * 16, paddingRight: props.size * 9,}
                }}>{props.score}/10</Text>
            </ImageBackground>
        </View>

    );
}

const styles = StyleSheet.create({
    image: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    text: {
        fontFamily: 'rubik',
    }
});

export default SafetyScore;