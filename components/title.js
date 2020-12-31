import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const Title = props => {
    return (
        <View style={styles.center}>
            <Text style={{ ...styles.title, ...styles.bottomSpace, ...{ fontSize: 24 } }}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomSpace: {
        marginBottom: 20,
    },
    title: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 5,
        fontSize: 20,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Title;