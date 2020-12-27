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
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';

import { CATEGORIES } from '../data/categoryData';
import Colors from '../constants/Colors';
import CategoryGridTile from '../components/categoryGridTile';


const HomeScreen = props => {

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                title={itemData.item.title}
                icon={itemData.item.icon}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'ResturauntCategory', params: {
                            categoryId: itemData.item.id
                        }
                    })
                }} />
        );
    }

    return (
        <SafeAreaView>
                    <SearchBar
                        placeholder="Type Here..."
                        platform="android"
                        round="true"
                    />
                    <Text style={styles.title}>Categories</Text>
                    <FlatList
                        //data = {formateData(CATEGORIES,numColumns)}
                        data={CATEGORIES}
                        renderItem={renderGridItem}
                        numColumns={2}
                        scrollEnabled={false}
                        nestedScrollEnabled={true}
                    >
                    </FlatList>
                    <Text style={styles.title}>Filter</Text>
                    <Text style={styles.test}>Test</Text>
                    <Text style={styles.test}>Test</Text>
                    <Text style={styles.test}>Test</Text>       
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
    title:{
        fontFamily: 'rubik',
        fontSize: 20,
        padding: 20, 
    },
    test:{
        fontSize: 150
    }
});
export default HomeScreen;