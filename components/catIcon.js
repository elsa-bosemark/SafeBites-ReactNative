import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const iconSize = 20;

// const CatIcon = props => {
//     let transactionArray = [];
//     const transactionReturn = props.cat.forEach((item) => {
//         let text;
//         if (item == 'restaurant_reservation'){
//             text='reservation'
//         }else{
//             text = item;
//         }
//         transactionArray.push(
//             <View style={styles.row}>
//                 <Ionicons style={styles.icon} name="checkmark" size={iconSize} color={'green'} />
//                 <Text style={[styles.text, styles.text]}>{text}</Text>
//             </View>
//         )
//     });

//     return transactionArray;
// }

const CatIcon = props => {

    let transactionArray = [];

    //DELIVERY
    const delivery = props.cat.indexOf('delivery');
    if (delivery >= 0) {
        transactionArray.push(
            <View style={styles.row}>
                <Ionicons style={styles.icon} name="checkmark" size={iconSize} color={'green'} />
                <Text style={[styles.text, styles.text]}>delivery</Text>
            </View>
        )
    } else if (delivery == -1) {
        transactionArray.push(
            <View style={styles.row}>
                <Ionicons style={styles.icon} name="close" size={iconSize} color={'red'} />
                <Text style={[styles.text, styles.text]}>delivery</Text>
            </View>
        )
    } else {
        transactionArray.push(
            <View style={styles.row}>
                <Ionicons style={styles.icon} name="question" size={iconSize} color={'grey'} />
                <Text style={[styles.text, styles.text]}>delivery</Text>
            </View>
        )
    }
    //PICKUP
    const pickup = props.cat.indexOf('pickup');

    if (pickup >= 0) {
        transactionArray.push(
            <View style={styles.row}>
                <Ionicons style={styles.icon} name="checkmark" size={iconSize} color={'green'} />
                <Text style={[styles.text, styles.text]}>pickup</Text>
            </View>
        )
    } else {
        transactionArray.push(
            <View style={styles.row}>
                <Ionicons style={styles.icon} name="close" size={iconSize} color={'red'} />
                <Text style={[styles.text, styles.text]}>pickup</Text>
            </View>
        )
    }
    //RESERVATION
    const reservation = props.cat.indexOf('restaurant_reservation');

    if (reservation >= 0) {
        transactionArray.push(
            <View style={styles.row}>
                <Ionicons style={styles.icon} name="checkmark" size={iconSize} color={'green'} />
                <Text style={[styles.text, styles.text]}>reservation</Text>
            </View>
        )
    } else {
        transactionArray.push(
            <View style={styles.row}>
                <Ionicons style={styles.icon} name="close" size={iconSize} color={'red'} />
                <Text style={[styles.text, styles.text]}>reservation</Text>
            </View>
        )
    }
    return transactionArray;
}

const styles = StyleSheet.create({
    icon: {
        paddingBottom: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flex: 1,
    },
    text: {
        fontFamily: 'rubik',
        fontSize: 18,
        marginLeft: 10,
        paddingBottom: 5,
    },
});
//export default TransactionDeliveryIcon;
export default CatIcon;