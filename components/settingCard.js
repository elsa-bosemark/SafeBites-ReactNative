import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const SettingCard = props => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onSelect}>
            <View style={styles.row}>
                <Text style={{fontSize:18}}>{props.text}</Text>
                <Ionicons name="ios-arrow-forward-outline" size={20}/>
            </View>
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 25,
        borderRadius: 10,
        margin:20,
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between"
    }
});

export default SettingCard;