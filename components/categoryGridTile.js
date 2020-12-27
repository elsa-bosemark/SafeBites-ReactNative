import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CategoryGridTile = props => {
    return (
        <TouchableOpacity style={styles.gridItem} onPress={props.onSelect}>
            <View >
                <Text>{props.title}</Text>
                <Image
                    style={styles.stretch}
                    source={props.icon}
                />
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 50,
    }
});

export default CategoryGridTile;