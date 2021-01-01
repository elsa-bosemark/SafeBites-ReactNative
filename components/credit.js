import React from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';


const Credit = props => {
    return (
        <View style={[styles.row, styles.center]}>
            <View style={styles.row}>
                <Text style={{ ...styles.text, ...{ paddingTop: 10 } }}>Information </Text>
                <Text style={{ ...styles.text, ...{ paddingTop: 10, fontFamily: 'rubik-bold' } }}>above</Text>
                <Text style={{ ...styles.text, ...{ paddingTop: 10 } }}> provided by </Text>
            </View>
            <Image style={styles.yelpImage} source={props.logo} />
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 5,
        fontSize: 20,
    },
    yelpImage: {
        width: 60,
        height: 25
    }
});

export default Credit;