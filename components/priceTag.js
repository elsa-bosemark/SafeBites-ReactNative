import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from "../constants/Colors";

const PriceTag = props => {
    if (props.price == null){
        return (
            <View style={styles.tag}>
                <Text
                    style={[styles.text]}
                >???</Text>
            </View>
        );
    }else{
        return (
            <View style={styles.tag}>
                <Text
                    style={[styles.text]}
                >
                    {props.price}
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    tag: {
        padding: 10,
        backgroundColor: Colors.accentColor,
        borderRadius: 5,
        height: 40,
      },
      text: {
        color: "white",
        fontSize:18
      },
     
});

export default PriceTag;