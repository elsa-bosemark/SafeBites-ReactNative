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
                <Text style={[styles.text, styles.smallText]}>{item}</Text>
            </View>
        )
    });
    console.log(transactionArray)
    return transactionArray;


    // switch (props.category) {
    //     case true:
    //         return <Ionicons style={styles.icon}  name="checkmark" size={iconSize} color={'green'} />
    //         break;
    //     case false:
    //         return <Ionicons style={styles.icon}  name="close" size={iconSize} color={'red'} />
    //         break;
    //     default:
    //        return <Ionicons style={styles.icon}  name="help" size={iconSize} color={'grey'} />
    // }
}
const TransactionDeliveryIcon = props => {
    // console.log('this is final decider ' + props.delivery)
    // switch (props.delivery) {
    //     case 'delivery':
    //         return <Ionicons style={styles.icon}  name="checkmark" size={iconSize} color={'green'} />
    //         break;
    //     case undefined:
    //         return <Ionicons style={styles.icon}  name="close" size={iconSize} color={'red'} />
    //         break;
    //     default:
    //        return <Ionicons style={styles.icon}  name="help" size={iconSize} color={'grey'} />
    // }

}

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
    smallText: {
        fontSize: 15,
    },
});
//export default TransactionDeliveryIcon;
export default CatIcon;