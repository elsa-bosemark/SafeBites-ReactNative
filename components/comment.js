import React from 'react';
import { View, StyleSheet, Text } from 'react-native';



const Comment = props => {
    return (
        <View style={styles.container}>
            <View style={{...styles.row,...styles.spacer}}>
                <Text style={styles.smallText}>Name</Text>
                <Text style={styles.smallText}>  {props.date}</Text>
            </View>
            <Text style={styles.mediumText}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    smallText: {
        fontSize: 15,
    },
    mediumText: {
        fontSize: 18,
    },
    container: {
        borderRadius: 10,
        marginLeft: 10,
        padding: 20,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: "row",
    },
    spacer:{
        paddingBottom:10,
    }
});

export default Comment;