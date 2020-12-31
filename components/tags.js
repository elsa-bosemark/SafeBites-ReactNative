import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
const Tags = props => {
    return (
        <View style={styles.center}><View style={styles.divider}></View></View>
    );
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      divider: {
        marginTop: 20,
        marginBottom: 20,
        width: '90%',
        height: 3,
        backgroundColor: Colors.primaryColor,
        borderRadius: 5,
      },
});

export default Tags;