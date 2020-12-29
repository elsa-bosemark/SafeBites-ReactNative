import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import RetaurantDetail from './restaurantDetailScreen';
import homeScreen from './homeScreen';
import { CATEGORIES } from '../../data/categoryData';

//this is equivalant to CatMealsScreen
const RestaurantCategoryScreen = props => {

  //get params sent by home screen (the catid) will give title and the resurants that fit into the
  const catId = props.navigation.getParam('categoryId');
  // look at each cat using find() and sees if it matches the catId
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return (
    <View style={styles.container}>
      <Text>restaurantCategory</Text>
      <Text>{selectedCategory.title}</Text>
      <Button title='go to rest detail' onPress={() => {
        props.navigation.navigate('ReturauntDetail');
      }} />
    </View>
  );
}

//this is a changeing screen (has mutiple cats) therefore I make into a function and can asscess the catId
RestaurantCategoryScreen.navigationOptions = navigationData => {
  //fetching nessary information (kinda repeating what I did in restaurantCategoryScreen)
  const catId = navigationData.navigation.getParam('categoryId');
  console.log(catId)
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default RestaurantCategoryScreen;