import React from 'react';
import {
    Button, 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    TouchableOpacity,
    Platform
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { CATEGORIES } from '../data/categoryData';
import Colors from '../constants/Colors';
import CategoryGridTile from '../components/categoryGridTile';


const HomeScreen = props => {

    const renderGridItem = (itemData) => {
        return (
           <CategoryGridTile 
           title={itemData.item.title} 
           icon = {itemData.item.icon}
           onSelect={()=>{
            props.navigation.navigate({
                routeName: 'ResturauntCategory', params: {
                    categoryId: itemData.item.id
                }
            })
           }}/>
        );
    }

    return (
        <SafeAreaView>
            <FlatList
                //data = {formateData(CATEGORIES,numColumns)}
                data={CATEGORIES}
                renderItem={renderGridItem}
                numColumns={2}
            >
            </FlatList>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default HomeScreen;