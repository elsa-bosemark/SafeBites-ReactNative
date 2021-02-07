import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const SettingCard = props => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onSelect}>
            <View style={styles.row}>
                <Text>{props.text}</Text>
                <Ionicons name="heart" />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
    },
    row:{
        flexDirection:"row",
    }
});

export default SettingCard;