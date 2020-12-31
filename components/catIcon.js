import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const iconSize = 20;

const CatIcon = props => {
    let transactionArray = [];
    const transactionReturn = props.cat.forEach((item) => {
        transactionArray.push(
            <View style={styles.row}>
                <Ionicons style={styles.icon} name="checkmark" size={iconSize} color={'green'} />
                <Text style={[styles.text, styles.text]}>{item}</Text>
            </View>
        )
    });
    
    return transactionArray;
}

// const CatIcon = props => {
//     let transactionArray = [];
//     switch (props.delivery) {
//         case 'delivery':
//             return <Ionicons style={styles.icon}  name="checkmark" size={iconSize} color={'green'} />
//             break;
//         case undefined:
//             return <Ionicons style={styles.icon}  name="close" size={iconSize} color={'red'} />
//             break;
//         default:
//            return <Ionicons style={styles.icon}  name="help" size={iconSize} color={'grey'} />
//     }

// }

const styles = StyleSheet.create({
    icon: {
        paddingBottom: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //flex:1,
    },
    text: {
        fontFamily: 'rubik',
        fontSize: 18,
    },
});
//export default TransactionDeliveryIcon;
export default CatIcon;